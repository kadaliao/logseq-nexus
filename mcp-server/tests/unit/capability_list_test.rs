use logseq_mcp_server::protocol::messages::{Capability, CapabilityStatus};
use logseq_mcp_server::state::capabilities::CapabilityList;

fn capability(id: &str, version: &str) -> Capability {
    Capability {
        capability_id: id.to_string(),
        version: version.to_string(),
        status: CapabilityStatus::Enabled,
        description: None,
    }
}

#[test]
fn uniqueness_by_id_version() {
    let mut list = CapabilityList::new();
    assert!(list.add(capability("pages.read", "1")));
    assert!(!list.add(capability("pages.read", "1")));
    assert!(list.add(capability("pages.read", "2")));
}
