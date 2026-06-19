---
name: remember-plan
description: "Use when planning with agents or during grill-me sessions to capture and store planning context. This skill saves important decisions, constraints, and next steps to MemPalace for later reference. Triggers: planning conversations, task breakdown, architectural decisions, multi-step planning."
---

# Remember Plan Skill

Capture and store planning context from agent conversations to MemPalace for persistence across sessions.

## When to Use

- During planning conversations with agents
- In grill-me sessions when decisions are made
- When breaking down complex tasks into steps
- Before starting multi-step implementations
- When architectural or technical decisions are discussed

## What Gets Stored

1. **Decisions Made** - Key choices and rationale
2. **Constraints** - Limitations discovered or stated
3. **Next Steps** - Action items and priorities
4. **Context** - Important background information

## Workflow

1. At the start of planning, acknowledge the skill is active
2. Listen for key decision points and constraints
3. At natural breakpoints, store relevant context using mempalace tools
4. Structure the stored info with clear labels

## Storage Format

Store to MemPalace using:

- **Wing**: `juanpasabuyph` (or relevant project)
- **Room**: `planning`
- **Content**: Structured with clear headings
  Example structure:

```markdown
# Planning Session - YYYY-MM-DD

## Problem

[What we're solving]

## Key Decisions

- Decision 1: [choice] because [reason]
- Decision 2: [choice] because [reason]

## Constraints

- [limitation 1]
- [limitation 2]

## Next Steps

1. [action item]
2. [action item]
```

## Retrieval

Later sessions can query:

- `mempalace_kg_query("planning")` - Find recent planning context
- `mempalace_search("decision")` - Search for specific decisions
- `mempalace_list_drawers("tickettimetracker", "planning","juanpasabuyph")` - List all planning drawers
