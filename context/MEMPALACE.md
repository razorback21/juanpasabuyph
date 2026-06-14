# Overview

MemPalace is a hierarchical memory model that maps projects, people, and topics into an imaginary building so an agent can store, scope, and retrieve context predictably. The top-level unit is a wing, which contains rooms for specific topics; additional layers (halls, tunnels, closets, drawers) provide semantic organization and retrieval granularity.

## Core Concepts

[[Link]](https://mempalaceofficial.com/concepts/the-palace.html)

**Wing** — Top-level scope. Represents a person or project; use one wing per distinct long‑lived context.

**Room** — Specific topic inside a wing. Rooms are named ideas (for example: auth-migration, graphql-switch, ci-pipeline) and can be auto-detected from folder structure or created manually.

**Hall** — Category layer inside a wing. Use halls to classify how memories relate (e.g., hall_facts, hall_events, hall_discoveries, hall_preferences, hall_advice).

**Tunnel / Bridge** — Cross-wing connections. When the same room name appears in multiple wings, treat it as a connection path for graph traversal.

**Closet** — Compact summary layer. Short notes that point back to original content.

**Drawer** — Original stored text chunks. Primary persisted text used for retrieval and scoring.

## Data Model Mapping for an AI Agent

**Metadata fields**

- `wing` = project/person identifier
- `room` = topic name
- `hall` = category tag (fact, event, discovery, preference, advice)
- `closet_summary` = short pointer text
- `drawer_text` = raw stored chunk used by vector store

**Storage and retrieval behavior**

Narrowing queries by wing or wing + room restricts vector scoring to that scope, improving operational predictability when many unrelated contexts exist.

## Navigation and Retrieval Patterns

**Graph traversal** — Start from a start_room and follow tunnels to discover related rooms across wings. Example tool call pattern: `mempalace_traverse { "start_room": "auth-migration" }`. Shared room names provide multiple paths to relevant context.

**Tunnel discovery** — Query pairs of wings to list shared rooms (bridges) that connect them; use this to surface cross-project decisions or repeated issues.

**Scoped search** — Always prefer wing + room filters when the user's question references a specific project or person to avoid noise from unrelated wings.

## Best Practices for an AI Agent

Assign one wing per long‑lived entity. This keeps metadata clean and reduces accidental cross-talk.

Name rooms with concise, stable identifiers. Use folder-derived names where possible so initialization can auto-detect structure.

Use halls to encode intent of content. Tagging a memory as hall_advice vs hall_facts changes how the agent surfaces it (recommendation vs decision).

Keep drawers as the canonical retrieval unit. Store full text chunks there; use closets for quick human-readable pointers.

Prefer deterministic scoping over heuristic boosts. The value of MemPalace is predictable scoping rules, not opaque retrieval tricks.

## Quick Reference Cheat Sheet

- **Create wing** — `wing:<name>` for each person/project
- **Add room** — `wing:<name>/room:<topic>`; auto-detect from folders when available
- **Tag hall** — `hall:hall_events` or `hall:hall_facts` depending on content type
- **Store drawer** — Save original text chunk to drawer_text for retrieval
- **Traverse graph** — Use `mempalace_traverse` with `start_room` to find related rooms across wings