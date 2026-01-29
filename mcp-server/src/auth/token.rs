use std::fs;

#[derive(Debug, thiserror::Error)]
pub enum TokenError {
    #[error("token not found")]
    NotFound,
    #[error("token mismatch")]
    Mismatch,
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),
}

pub fn load_token_from_env() -> Result<String, TokenError> {
    std::env::var("LOGSEQ_MCP_TOKEN").map_err(|_| TokenError::NotFound)
}

pub fn load_token_from_file(path: &str) -> Result<String, TokenError> {
    let raw = fs::read_to_string(path)?;
    let token = raw.trim().to_string();
    if token.is_empty() {
        return Err(TokenError::NotFound);
    }
    Ok(token)
}

pub fn validate_token(provided: &str, expected: &str) -> Result<(), TokenError> {
    if provided == expected {
        Ok(())
    } else {
        Err(TokenError::Mismatch)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn validates_token_match() {
        assert!(validate_token("abc", "abc").is_ok());
    }

    #[test]
    fn rejects_token_mismatch() {
        assert!(matches!(
            validate_token("abc", "def"),
            Err(TokenError::Mismatch)
        ));
    }
}
