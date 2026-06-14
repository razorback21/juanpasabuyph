# CRITICAL: Agent Session Start — DO NOT SKIP

## MANDATORY STARTUP STEPS

1. **Load Caveman Skill**: Always run caveman skill if not already loaded
2. **Read Context Files**: MUST read ALL files below before ANY other work:
   - `./context/OVERVIEW.md` — Project overview
   - `./CLAUDE.md` — Main project context
   - `./context/CODING_BEHAVIOR.md` — Coding behavior guidelines
   - `./context/CODING_STANDARDS.md` — Code style and conventions
   - `./context/ADMIN_DESIGN_SYSTEM.md` — Admin page design patterns
3. **Confirm Completion**: Tell the user "Ready to Rock N' Roll" after all files are read

**WARNING**: Do NOT start any work without completing steps 1-3 first. 

## Memory Store
- Use MemPalace for session memories and knowledge storage
- Query knowledge graph for entity relationships and historical facts
- [Documentation](./context/MEMPALACE.md)

## Memory Recall Priority
- Always check MemPalace first before using other methods for recalling information
- [Documentation](./context/MEMPALACE.md)

## Code Search Priority
- Search the code base in this order
- GitNexus
- Serena
- then others (grep/glob/environment_details/etc..)

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **juanpasabuyph** (3147 symbols, 5744 relationships, 52 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/juanpasabuyph/context` | Codebase overview, check index freshness |
| `gitnexus://repo/juanpasabuyph/clusters` | All functional areas |
| `gitnexus://repo/juanpasabuyph/processes` | All execution flows |
| `gitnexus://repo/juanpasabuyph/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
