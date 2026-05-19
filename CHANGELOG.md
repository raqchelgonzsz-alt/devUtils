# 📋 Changelog

All notable changes to the **Stoolzen** project will be documented in this file. This project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.1.0] - 2026-05-19

### Added
* **Technical SEO Bottom Blocks:** Comprehensive informational guides, structured inline comparative code examples, and programmatic internal links arrays inside `JSONFormatter` and `GraphQLFormatter`.
* **JSON-LD Schema Injection:** Context-rich markup for `SoftwareApplication` and dynamic `FAQPage` embedded directly onto tools pages for crawlers validation.
* **Interactive Accordion FAQs:** React-based fluid dynamic accordions in Spanish for answering developer security and processing queries locally.

### Changed
* **Monaco loading skeletons (`EditorSkeleton`):** Implemented high-fidelity skeleton overlays matching vscode token color syntax (VS Light/VS Dark) to optimize user perceived load speeds during asynchronous downloads.
* **CLS Prevention Layout tuning:** Enforced a `min-h-[450px]` container block to reserve sizing grids on the page DOM tree before Monaco modules load.
* **Typing Rigor improvements:** Explicitly typed fallback schemas to ensure `tsc --noEmit` and `vite build` compilation pipelines run without static compiler errors.

### Fixed
* **Broken Sitemap.xml Syntax:** Repaired invalid JSX-style comments in sitemap which caused index blocks blocking. Added Base64 and Text utilities routes into sitemap map index tree.
* **Broken Internal Links:** Reconnected all deprecated or 404 links inside related content directories to actual indexable endpoints.

---

## [1.0.0] - 2026-05-12

### Added
* **JSON Formatter & Validator:** Comprehensive tools powered by Monaco Editor for beautifying, indenting and fixing JSON payloads client-side.
* **GraphQL Formatter & Validator:** Query normalization parser operating client-side with syntax highlighting.
* **JWT Decoder:** Cryptographically safe Offline Token decoder for inspect parameters (Header and Payload block segments).
* **Base64 Encoder / Decoder:** Text utilities with quick actions (Copy, clear, upload and download files).
* **Multi-Theme Engine:** Real-time dark mode and light mode configuration using CSS variables HSL palettes.
* **Infrastructure Setup:** Cloudflare Page Edge optimization settings, Content Security Policy, and initial Google AdSense block settings.

[1.1.0]: https://github.com/tu-usuario/stoolzen/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/tu-usuario/stoolzen/releases/tag/v1.0.0
