use std::collections::HashSet;

use crate::protocol::messages::{Capability, CapabilityStatus};

#[derive(Debug, Default)]
pub struct CapabilityList {
    capabilities: Vec<Capability>,
    seen: HashSet<(String, String)>,
}

impl CapabilityList {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn from_capabilities(capabilities: Vec<Capability>) -> Self {
        let mut list = Self::new();
        for capability in capabilities {
            let _ = list.add(capability);
        }
        list
    }

    pub fn add(&mut self, capability: Capability) -> bool {
        let key = (capability.capability_id.clone(), capability.version.clone());
        if self.seen.contains(&key) {
            return false;
        }
        self.seen.insert(key);
        self.capabilities.push(capability);
        true
    }

    pub fn enabled(&self) -> Vec<Capability> {
        self.capabilities
            .iter()
            .filter(|cap| cap.status == CapabilityStatus::Enabled)
            .cloned()
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn capability(id: &str, version: &str) -> Capability {
        Capability {
            capability_id: id.to_string(),
            version: version.to_string(),
            status: CapabilityStatus::Enabled,
            description: None,
        }
    }

    #[test]
    fn enforces_id_version_uniqueness() {
        let mut list = CapabilityList::new();
        assert!(list.add(capability("pages.list", "1")));
        assert!(!list.add(capability("pages.list", "1")));
        assert!(list.add(capability("pages.list", "2")));
    }
}
