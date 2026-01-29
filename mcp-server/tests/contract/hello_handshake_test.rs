use logseq_mcp_server::protocol::messages::{Capability, CapabilityStatus, HelloRequest};
use logseq_mcp_server::runtime::handshake::handle_hello;

fn capability(id: &str, version: &str, status: CapabilityStatus) -> Capability {
    Capability {
        capability_id: id.to_string(),
        version: version.to_string(),
        status,
        description: None,
    }
}

#[test]
fn handshake_filters_enabled_capabilities() {
    let request = HelloRequest {
        logseq_version: "0.10".to_string(),
        plugin_version: "0.1.0".to_string(),
        api_capabilities: vec![
            capability("pages.list", "1", CapabilityStatus::Enabled),
            capability("pages.list", "1", CapabilityStatus::Enabled),
            capability("blocks.read", "1", CapabilityStatus::Disabled),
        ],
    };

    let ack = handle_hello(request, "0.1.0");
    assert_eq!(ack.server_version, "0.1.0");
    assert_eq!(ack.enabled_capabilities.len(), 1);
    assert_eq!(ack.enabled_capabilities[0].capability_id, "pages.list");
}
