use std::fs;

use logseq_mcp_server::auth::token::{load_token_from_file, validate_token, TokenError};

#[test]
fn loads_token_from_file() {
    let path = std::env::temp_dir().join("logseq_mcp_token_test.txt");
    fs::write(&path, "test-token\n").expect("write token file");
    let token = load_token_from_file(path.to_str().unwrap()).expect("load token");
    assert_eq!(token, "test-token");
    let _ = fs::remove_file(path);
}

#[test]
fn rejects_invalid_token() {
    let err = validate_token("bad", "good").unwrap_err();
    assert!(matches!(err, TokenError::Mismatch));
}
