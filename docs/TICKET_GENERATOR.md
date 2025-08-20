# Ticket Generator (Cursor Instruction)

## Classification
- **Feature** — new functionality  
- **Bug** — incorrect behavior  
- **TechDebt** — refactor/cleanup, no behavior change  

## File Paths
- Feature → `docs/tickets/features/FEATURE_<slug>.md`  
- Bug → `docs/tickets/bugs/BUG_<slug>.md`  
- TechDebt → `docs/tickets/techdebt/DEBT_<slug>.md`  

## Rules
1. Fill all sections (use `[TODO]` if unknown).  
2. Small scope ≤ 2–3 days.  
3. No skipping tests/docs.  
4. Save to correct folder.  

---

## Templates

### 📦 Feature
```markdown
# Feature: <title>

## Story
As a <role>, I want <action>, so that <value>.

## Acceptance Criteria
- [ ] Success scenario
- [ ] Error scenarios
- [ ] Edge cases
- [ ] Tracking events/KPI (if applicable)

## UX
Wireframe/flow: [TODO]

## Design & Contract
- [ ] DB migrations
- [ ] API contract (Zod/OpenAPI)
- [ ] ADR required?

## Implementation
- [ ] Backend
- [ ] Frontend
- [ ] Feature flag

## Tests
- [ ] Unit
- [ ] Integration
- [ ] Contract
- [ ] E2E

## Deployment
- [ ] PR
- [ ] CI
- [ ] Preview
- [ ] Staged rollout

## Closure
- [ ] KPI checked
- [ ] Flag removed
- [ ] Docs updated
```

---

### 🐞 Bug
```markdown
# Bug: <title>

## Report
Steps to reproduce:  
Actual result:  
Expected result:  
Evidence (logs/screenshots):  

## Severity
- [ ] Blocker
- [ ] Major
- [ ] Minor

## Fix Plan
- [ ] Write failing test
- [ ] Fix code
- [ ] Test is green

## Deployment
- [ ] PR
- [ ] Preview verified
- [ ] Staged rollout

## Closure
- [ ] Test remains in suite
- [ ] Root cause noted
```

---

### ⚙️ Tech Debt
```markdown
# Tech Debt: <title>

## Problem
What slows development / risks:  

## Plan
- [ ] ADR needed?
- [ ] Scope defined

## Refactor
- [ ] Change applied (no behavior change)
- [ ] Tests added/updated

## Deployment
- [ ] PR
- [ ] CI

## Closure
- [ ] Docs updated
- [ ] Tagged [refactor]
```

<!-- ПОЯСНЕНИЕ: Cursor всегда будет использовать эти шаблоны -->
