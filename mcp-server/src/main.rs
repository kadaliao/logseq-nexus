use logseq_mcp_server::auth::token;
use logseq_mcp_server::runtime::server::RuntimeServer;
use std::net::SocketAddr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load auth token from environment
    let auth_token = token::load_token_from_env().map_err(|e| {
        eprintln!("Error: Failed to load LOGSEQ_MCP_TOKEN from environment: {}", e);
        e
    })?;

    println!("Loaded auth token from environment");

    // Create runtime server
    let server = RuntimeServer::new(auth_token);

    // Parse address (default port 8765)
    let port = std::env::var("LOGSEQ_MCP_PORT")
        .ok()
        .and_then(|p| p.parse::<u16>().ok())
        .unwrap_or(8765);

    let addr: SocketAddr = format!("127.0.0.1:{}", port).parse()?;

    println!("Starting MCP server on {}", addr);

    // Start the server
    server.start(addr).await?;

    Ok(())
}
