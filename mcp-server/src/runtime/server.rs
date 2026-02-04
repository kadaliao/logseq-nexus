use crate::auth::token;
use crate::protocol::messages::HelloRequest;
use crate::runtime::handshake;
use futures_util::{StreamExt, SinkExt};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::Message};

/// The MCP server version string
const SERVER_VERSION: &str = "0.1.0";

/// JSON-RPC 2.0 request structure
///
/// Example hello request:
/// ```json
/// {
///   "id": 1,
///   "method": "hello",
///   "params": {
///     "auth_token": "your-secret-token",
///     "logseq_version": "0.10.0",
///     "plugin_version": "0.1.0",
///     "api_capabilities": [...]
///   }
/// }
/// ```
#[derive(Debug, Serialize, Deserialize)]
struct JsonRpcRequest {
    id: Option<serde_json::Value>,
    method: String,
    params: Option<serde_json::Value>,
}

/// JSON-RPC 2.0 response structure
#[derive(Debug, Serialize, Deserialize)]
struct JsonRpcResponse {
    id: Option<serde_json::Value>,
    result: Option<serde_json::Value>,
    error: Option<JsonRpcError>,
}

/// JSON-RPC 2.0 error object
#[derive(Debug, Serialize, Deserialize)]
struct JsonRpcError {
    code: i32,
    message: String,
}

pub struct RuntimeServer {
    expected_token: String,
}

impl RuntimeServer {
    pub fn new(expected_token: String) -> Self {
        Self { expected_token }
    }

    pub fn authenticate(&self, provided: &str) -> Result<(), token::TokenError> {
        token::validate_token(provided, &self.expected_token)
    }

    /// Start the WebSocket server on the specified address
    pub async fn start(&self, addr: SocketAddr) -> Result<(), Box<dyn std::error::Error>> {
        let listener = TcpListener::bind(addr).await?;
        println!("WebSocket server listening on {}", addr);

        loop {
            match listener.accept().await {
                Ok((stream, peer_addr)) => {
                    println!("New connection from {}", peer_addr);
                    let expected_token = self.expected_token.clone();

                    tokio::spawn(async move {
                        if let Err(e) = handle_connection(stream, expected_token).await {
                            eprintln!("Error handling connection from {}: {}", peer_addr, e);
                        }
                    });
                }
                Err(e) => {
                    eprintln!("Error accepting connection: {}", e);
                }
            }
        }
    }
}

async fn handle_connection(
    stream: TcpStream,
    expected_token: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let ws_stream = accept_async(stream).await?;
    println!("WebSocket connection established");

    let (mut ws_sender, mut ws_receiver) = ws_stream.split();

    // Wait for the first message (should be hello with auth token)
    while let Some(msg) = ws_receiver.next().await {
        let msg = msg?;

        match msg {
            Message::Text(text) => {
                println!("Received message: {}", text);

                // Parse as JSON-RPC request
                let request: JsonRpcRequest = match serde_json::from_str(&text) {
                    Ok(req) => req,
                    Err(e) => {
                        eprintln!("Failed to parse JSON-RPC request: {}", e);
                        let error_response = JsonRpcResponse {
                            id: None,
                            result: None,
                            error: Some(JsonRpcError {
                                code: -32700,
                                message: format!("Parse error: {}", e),
                            }),
                        };
                        let response_text = serde_json::to_string(&error_response)?;
                        ws_sender.send(Message::Text(response_text)).await?;
                        continue;
                    }
                };

                // Handle the method
                match request.method.as_str() {
                    "hello" => {
                        // Extract params
                        let params = request.params.ok_or("Missing params")?;

                        // Parse HelloRequest with auth token
                        #[derive(Deserialize)]
                        struct HelloParams {
                            auth_token: String,
                            #[serde(flatten)]
                            hello_request: HelloRequest,
                        }

                        let hello_params: HelloParams = serde_json::from_value(params)?;

                        // Authenticate
                        if let Err(e) = token::validate_token(&hello_params.auth_token, &expected_token) {
                            eprintln!("Authentication failed: {}", e);
                            let error_response = JsonRpcResponse {
                                id: request.id,
                                result: None,
                                error: Some(JsonRpcError {
                                    code: -32001,
                                    message: format!("Authentication failed: {}", e),
                                }),
                            };
                            let response_text = serde_json::to_string(&error_response)?;
                            ws_sender.send(Message::Text(response_text)).await?;
                            break;
                        }

                        println!("Authentication successful");

                        // Handle hello handshake
                        let hello_ack = handshake::handle_hello(hello_params.hello_request, SERVER_VERSION);

                        // Send response
                        let response = JsonRpcResponse {
                            id: request.id,
                            result: Some(serde_json::to_value(hello_ack)?),
                            error: None,
                        };

                        let response_text = serde_json::to_string(&response)?;
                        println!("Sending hello ack: {}", response_text);
                        ws_sender.send(Message::Text(response_text)).await?;

                        println!("Handshake completed successfully");
                    }
                    _ => {
                        // Unknown method
                        let error_response = JsonRpcResponse {
                            id: request.id,
                            result: None,
                            error: Some(JsonRpcError {
                                code: -32601,
                                message: format!("Method not found: {}", request.method),
                            }),
                        };
                        let response_text = serde_json::to_string(&error_response)?;
                        ws_sender.send(Message::Text(response_text)).await?;
                    }
                }
            }
            Message::Close(_) => {
                println!("Client closed connection");
                break;
            }
            Message::Ping(data) => {
                ws_sender.send(Message::Pong(data)).await?;
            }
            _ => {
                // Ignore other message types for now
            }
        }
    }

    Ok(())
}
