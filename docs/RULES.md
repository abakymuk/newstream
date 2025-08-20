# Global Development Rules

1. Every task = ticket (Feature / Bug / TechDebt).
2. Scope ≤ 2–3 days. Split if bigger.
3. Contracts and migrations always first.  
   - API → Zod/OpenAPI  
   - DB → migrations only (Expand → Backfill → Contract)
4. All features under feature flags.
5. CI required: lint, typecheck, migrations, tests (unit/integration/contract/e2e), build.
6. Tests required. No tests → no merge.
7. PR only via template.
8. Docs updated for any contract/DB/architecture change.
9. Observability: every feature logs errors and sends analytics events.

<!-- ПОЯСНЕНИЕ: эти правила обязательны для любого тикета -->
