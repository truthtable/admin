---
name: maintain-architecture
description: >
  Keeps ARCHITECTURE.md in sync with the codebase. Trigger automatically whenever
  any code change is made — new file, deleted file, new route, new Redux slice,
  new dependency, DB schema change, config change, or new pattern introduced.
  Read ARCHITECTURE.md first, then update only the affected sections.
---

## When to Trigger

Trigger this skill whenever you:
- Add or delete a source file
- Add or remove a route in `App.jsx`
- Add or remove a Redux slice/reducer in `state/store.js`
- Change the Dexie schema in `src/db/db.js`
- Add or remove a dependency in `package.json`
- Change API base URL or add new endpoints in `src/services/Api.jsx`
- Add a new `src/` top-level directory or feature folder
- Change the build config (`vite.config.js`, `tailwind.config.js`, etc.)
- Introduce a new architectural pattern or convention

## Workflow

1. **Read** [`ARCHITECTURE.md`](../ARCHITECTURE.md) to understand current state.
2. **Identify** which section(s) are affected by your change:
   - New file → **Project Structure**
   - New route → **Routing** table
   - New Redux slice → **State Management** table
   - New dependency → **Tech Stack** table
   - Schema change → **Data Layer** section
   - New pattern → **Key Patterns** section
   - New endpoint → **Data Layer › REST API** section
3. **Update only the affected sections** — do not rewrite unrelated sections.
4. **Do it in the same turn** as the code change. Never defer.

## Rules

- **Never skip** this update, even for "small" changes.
- **One file**: All architecture lives in `ARCHITECTURE.md` at project root.
- **Accuracy over completeness**: If unsure about a detail, note it with a `<!-- TODO: verify -->` comment rather than guessing.
- **Preserve existing formatting**: Keep tables, code blocks, and section headers consistent with the existing document style.
- **Mark legacy clearly**: If adding to State Management, note whether the slice is legacy (`state/`) or new (`redux/reducers/`).

## Reference

Architecture file: [`ARCHITECTURE.md`](../ARCHITECTURE.md)
