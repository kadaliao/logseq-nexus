use crate::protocol::messages::{HelloAck, HelloRequest};
use crate::state::capabilities::CapabilityList;

pub fn handle_hello(request: HelloRequest, server_version: &str) -> HelloAck {
    let list = CapabilityList::from_capabilities(request.api_capabilities);
    HelloAck {
        server_version: server_version.to_string(),
        enabled_capabilities: list.enabled(),
    }
}
