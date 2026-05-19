# 🤝 Contributing to Stoolzen

Thank you for considering contributing to **Stoolzen**! We are committed to building the most reliable, secure, and beautiful developer tool suite on the web.

To ensure our codebase remains clean, performant, and reliable, please follow these guidelines.

---

## 🔒 The Golden Rule: absolute client-side privacy

Before writing any line of code for a new or existing tool, you must guarantee that **no user-input data is transmitted over the network**.
* Do not make network calls (fetch, Axios, WebSockets) that carry payload strings.
* All parsers, formatters, encryptions, and compression steps must be written as local, deterministic client-side JavaScript utilities.
* If your tool requires a third-party validator, package it locally in your dependencies or use client-side bundlers.

---

## 🌿 Branching Workflow

1. Fork the repository on GitHub.
2. Create a clean branch from `main` naming it according to its scope:
   * For new tools: `feature/tool-name`
   * For bug fixes: `bugfix/issue-description`
   * For performance updates: `perf/optimization-name`
3. Push your branch and open a detailed Pull Request.

---

## 💬 Commit Message Convention

We enforce the **Conventional Commits** standard to automatically compile changelogs and preserve history:

Format: `<type>(<scope>): <short summary>`

### Allowed Types:
* `feat`: A new tool, component, or layout module.
* `fix`: A bug fix (e.g., repairing parsing errors or visual mismatches).
* `docs`: Documentation updates (e.g., changes to README or guides).
* `perf`: Performance tuning (e.g., reducing AST processing time or layout shift).
* `style`: Styling tweaks or Tailwind configuration updates.
* `refactor`: Structural changes that do not alter features.

### Example Commits:
* `feat(graphql): add ast-based parsing for schema validator`
* `fix(json): repair raw format copy clipboard action`
* `perf(monaco): implement dynamic loading skeleton for diff editor`

---

## 🛠️ Verification & Quality Assurance

Before submitting your PR, you must run the following checks locally:

### 1. Style & Linting
Verify code structure and ensure all TypeScript types compile without errors:
```bash
pnpm run lint
```

### 2. Sandbox Verification
Launch the local server to verify component rendering and cross-browser responsiveness:
```bash
pnpm run dev
```

### 3. Production Build Validation
Confirm that Vite wraps all dependencies and code-split chunks correctly for optimal production distribution:
```bash
pnpm run build
```
Any PR that fails the build step will not be eligible for review or merging.
