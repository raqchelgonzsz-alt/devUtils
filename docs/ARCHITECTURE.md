# 📐 Stoolzen - System Architecture

This document describes the high-level system design, architectural principles, data flow, and performance optimizations implemented in **Stoolzen**.

---

## 🏛️ High-Level Architectural Principles

Stoolzen is built with three architectural tenets:
1. **Zero-Trust Client-Side Processing (Privacy First):** No user-submitted payloads (JSON, GraphQL, JWTs) are sent to any API or backend server. All parsing, validation, formatting, and minification algorithms run natively in the user's browser.
2. **Deterministic UI Performance (Zero CLS & Visual Lag):** Layout containers are strictly dimensioned, and editors utilize custom loading skeletons to ensure zero Cumulative Layout Shift (CLS). Intensive parsing processes are debounced to guarantee smooth rendering.
3. **Optimized Search Discoverability (Technical Programmatic SEO):** Core structures and categories are indexable via server-side pre-rendering, complemented by context-aware canonical tag dynamic mapping and strict structured schemas (JSON-LD).

---

## 📂 Codebase Anatomy

```text
├── public/                 # Static assets (robots.txt, sitemap.xml, custom icons)
├── src/
│   ├── components/         # Reusable application components
│   │   ├── Layout/         # Global layout components (Sidebar, TopBar, AdBanner)
│   │   ├── UI/             # Atomic components (Buttons, Inputs, Loading Skeletons)
│   │   └── SEO/            # Dynamic metadata and JSON-LD schema injection
│   ├── context/            # Shared React context modules (Theme, Cookie Consent)
│   ├── lib/                # Middleware, third-party libraries, utility hook wrapper initialization
│   ├── pages/              # Application views and routing modules (Formatter, Decoders, Blog)
│   ├── utils/              # Clean processing algorithms (AST parsers, string formatters, helpers)
│   └── styles/             # Global CSS style tokens and Tailwind utility layers
```

---

## ⚡ Core Engine & Performance Optimizations

### 1. Monaco Editor Integration
The platform integrates the core of VS Code (`@monaco-editor/react`) to provide professional-grade code view features:
* **Asynchronous Chunking:** Monaco assets are loaded dynamically from CDN buffers, keeping the initial JS bundle size highly compact.
* **Layout Preserving Skeletons:** A custom `EditorSkeleton` component mimic lines of code using subtle pulsating animations during the load sequence, preventing layout shifts.
* **Strict DOM Sizing:** Contained editors are placed inside strict `min-h-[450px]` containers to anchor the viewport and avoid sudden layout jumping.

### 2. GraphQL Parsing and Validation AST
GraphQL formatting is powered by robust AST (Abstract Syntax Tree) algorithms. 
* **Validation Phase:** Prior to formatting, strings are tokenized and parsed into an AST. Any syntactic error is mapped to Monaco's marker model.
* **Performance Control:** To prevent blockages on huge queries, text inputs are debounced: validation and AST generation only trigger `250ms` after the user stops typing.

### 3. Progressive Web Layout Strategy
To balance Google AdSense visibility with developer workspace UX, Stoolzen deploys responsive, non-obstructive CSS boxes:
* Ad containers are pre-dimensioned via HSL background tokens, maintaining layout stability even if the ad block fails to load or is blocked.
* Maximize buttons allow developers to expand their workspace into a clean full-screen layout, which suspends ad rendering altogether to maximize focus.
