use logseq_mcp_server::protocol::messages::{Capability, CapabilityStatus, HelloRequest};
use logseq_mcp_server::runtime::capabilities::refresh_capabilities;

fn capability(id: &str, version: &str, status: CapabilityStatus) -> Capability {
    Capability {
        capability_id: id.to_string(),
        version: version.to_string(),
        status,
        description: None,
    }
}

#[test]
fn capability_refresh_deduplicates_and_filters() {
    let request = HelloRequest {
        logseq_version: "0.10".to_string(),
        plugin_version: "0.1.0".to_string(),
        api_capabilities: vec![
            capability("pages.create", "1", CapabilityStatus::Enabled),
            capability("pages.create", "1", CapabilityStatus::Enabled),
            capability("blocks.move", "1", CapabilityStatus::Disabled),
        ],
    };

    let response = refresh_capabilities(request);
    assert_eq!(response.capabilities.len(), 1);
    assert_eq!(response.capabilities[0].capability_id, "pages.create");
}
