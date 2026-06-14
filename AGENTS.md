## Agent Session Start
1. Always run caveman skill if not loaded and read ./CLAUDE.md if not yet loaded and then must tell the user that you are ready to Rock N' Roll.
2. Do not skip without reading ./context/[CODING_BEHAVIOR.md, CODING_STANDARDS.md]. Confirm if by telling the user that you have read it. 

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


