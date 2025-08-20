# Development Flow (Next.js + Supabase + Prisma + shadcn/ui)

<!-- ПОЯСНЕНИЕ: этот файл описывает безопасную очередность разработки и ошибки, которых нужно избегать -->

---

## Base Setup (once per project)

1. **Project skeleton & CI**
   - Monorepo, `.env`, linters, typecheck, auto-build, tests in CI.
2. **Authentication & Roles**
   - Sign up/in, refresh tokens, orgs/roles, basic RLS in DB.
3. **Observability & Errors**
   - Logs, metrics, alerts, error handling in API + frontend.
4. **Design system & UI skeleton**
   - Themes, buttons/forms, navigation, screens with `loading/empty/error`.

---

## Feature Flow (vertical slice, repeated every time)

1. **UX sketch (5–15 min)** — quick screen/flow wireframe.
2. **Contract (OpenAPI/JSON Schema)** — define request/response.
3. **DB migrations** — tables, indexes, constraints, RLS.
4. **Backend** — route handlers, validators, error codes.
5. **Frontend** — page/component calling real API (`loading/empty/error/success` states).
6. **Instrumentation** — analytics events + technical metrics.
7. **Feature flag → Preview → Staged rollout**
   - 5–10% users → monitor → expand rollout.

---

## SaaS Block Order (recommended)

1. **Auth & Accounts** (login, logout, recovery, SSO if possible).
2. **Org/Workspace & Roles** (orgs, invitations, roles, RLS).
3. **User & Org Settings** (profile, timezone, language, defaults).
4. **Core domain entity v1** (first entity CRUD: list/detail).
5. **Search / Filters / Sorting** (make data usable).
6. **Import/Integrations** (or simple export).
7. **Notifications** (email/in-app, only critical).
8. **Billing/Subscriptions** (after real usage).
9. **Admin Panel / Audit** (logs, access management).
10. **Automations / Webhooks** (when core is stable).

---

## What NOT to do

- ❌ Don’t build “all backend first, then all frontend”. Always vertical slices.  
- ❌ Don’t create complex UI without a live API contract. Contract first → stub → refine UI.  
- ❌ Don’t change DB schema manually. Only migrations (Expand → Backfill → Contract).  
- ❌ Don’t release without feature flags and observability.  

---

## Example (stack-specific)

- **Base setup:** Supabase Auth → org-level RLS → UI skeleton (Next + shadcn/ui).  
- **Feature "Orders v1":**  
  1. UX sketch  
  2. OpenAPI `/orders`  
  3. Migration `orders`  
  4. NestJS controller/service  
  5. Next.js page `/orders`  
  6. Analytics events `order_viewed`, `order_created`  
  7. Release under feature flag `feat_orders`.  
