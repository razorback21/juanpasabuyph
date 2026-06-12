## Agent Session Start
1. Always run caveman skill if not loaded and read ./CLAUDE.md if not yet loaded and then must tell the user that you are ready to Rock N' Roll.

## Memory Store
- Use MemPalace for session memories and knowledge storage
- File memories in wing_[project]/room format
- Create cross-wing tunnels for related content between projects
- Use diary entries for personal agent memories in AAAK format
- Query knowledge graph for entity relationships and historical facts

## Code Search Priority
- Always use GitNexus knowledge graph search before grep/environment_details
- Use `gitnexus_query()` for codebase search and architecture understanding
- Use `gitnexus_context()` for detailed symbol analysis
- Use `gitnexus_impact()` for blast radius analysis before code changes
- Use `gitnexus_detect_changes()` before committing
- Fall back to grep only when GitNexus tools fail or return no results

## Memory Recall Priority
- Always check MemPalace first before using other methods for recalling information
- Use `mempalace_search()` for quick queries, `mempalace_kg_query()` for facts, `mempalace_list_drawers()` for specific content
- Only fall back to grep/read/webfetch if MemPalace returns no results