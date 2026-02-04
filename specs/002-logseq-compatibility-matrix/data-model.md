# Data Model: Logseq Compatibility Matrix

## Entities

### LogseqVersion

- **id**: string (e.g., `logseq-0.10.15`)
- **version**: string (semantic version)
- **release_date**: date (optional)
- **support_status**: enum (`supported`, `out_of_scope`)
- **notes**: string (optional)

### CapabilityArea

- **id**: string (e.g., `block_crud`, `advanced_queries`, `search`)
- **display_name**: string
- **description**: string

### CompatibilityEntry

- **id**: string
- **version_id**: LogseqVersion.id
- **capability_id**: CapabilityArea.id
- **status_label**: enum (`Supported`, `Partial`, `Unsupported`)
- **summary**: string (human-readable status note)
- **evidence_note_ids**: EvidenceNote.id[]
- **last_verified**: date

### SearchStrategyDecision

- **id**: string
- **primary_method**: string
- **fallback_rules**: string[]
- **applies_to_versions**: LogseqVersion.id[]
- **rationale**: string
- **last_updated**: date

### EvidenceNote

- **id**: string
- **source_type**: enum (`doc`, `test`, `observation`)
- **detail**: string
- **captured_at**: date
- **link**: string (optional)

### Gap

- **id**: string
- **description**: string
- **impact**: string
- **affected_versions**: LogseqVersion.id[]
- **capability_id**: CapabilityArea.id (optional)
- **follow_up_action**: string
- **status**: enum (`open`, `mitigated`, `closed`)

## Relationships

- LogseqVersion **1 → N** CompatibilityEntry
- CapabilityArea **1 → N** CompatibilityEntry
- CompatibilityEntry **N → N** EvidenceNote (via evidence_note_ids)
- LogseqVersion **1 → N** Gap (via affected_versions)
- CapabilityArea **1 → N** Gap

## Validation Rules

- `status_label` MUST be one of `Supported`, `Partial`, `Unsupported`.
- Every CompatibilityEntry MUST include at least one EvidenceNote.
- `Partial` and `Unsupported` entries MUST have at least one Gap referenced in the gap log.
- Out-of-scope versions MUST NOT appear in CompatibilityEntry.
- Supported versions MUST cover all CapabilityArea values.
- SearchStrategyDecision MUST cover all supported versions.

## State Transitions

- **Compatibility Matrix**: `draft` → `reviewed` → `approved`
- **Search Strategy Decision**: `draft` → `approved` → `superseded`
- **Gap**: `open` → `mitigated` → `closed`

## Derived Views

- **Compatibility Matrix View**: group CompatibilityEntry by LogseqVersion, sorted by version (descending), and render CapabilityArea columns with status labels + evidence notes.
- **Gaps Summary**: list open gaps by capability and affected versions.
