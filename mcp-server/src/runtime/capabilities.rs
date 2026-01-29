use crate::protocol::messages::{CapabilityResponse, HelloRequest};
use crate::state::capabilities::CapabilityList;

pub fn refresh_capabilities(latest: HelloRequest) -> CapabilityResponse {
    let list = CapabilityList::from_capabilities(latest.api_capabilities);
    CapabilityResponse {
        capabilities: list.enabled(),
    }
}
