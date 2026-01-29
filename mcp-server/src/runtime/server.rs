use crate::auth::token;

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
}
