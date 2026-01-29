use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct Capability {
    pub capability_id: String,
    pub version: String,
    pub status: CapabilityStatus,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum CapabilityStatus {
    Enabled,
    Disabled,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct HelloRequest {
    pub logseq_version: String,
    pub plugin_version: String,
    pub api_capabilities: Vec<Capability>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct HelloAck {
    pub server_version: String,
    pub enabled_capabilities: Vec<Capability>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct CapabilityRequest {
    pub session_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
pub struct CapabilityResponse {
    pub capabilities: Vec<Capability>,
}
