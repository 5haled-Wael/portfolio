# Portfolio V2 — Project Tracker

> Source of truth for feature status, remaining work, estimates, and completion criteria.
> Keep this file updated on `feature/portfolio-v2`. A feature is not **Done** until its acceptance criteria have been checked.

## 1. Tracking schema

The tracker uses Markdown tables to stay inside the repository and avoid adding another tool.

### Feature fields

| Field | Meaning |
|---|---|
| ID | Stable feature identifier used by task rows |
| Feature | Deliverable or area of the application |
| Status | Not Started / In Progress / Blocked / Deferred / Done / Needs Audit |
| Priority | P0 = required to ship, P1 = important, P2 = optional polish |
| Estimate (h) | Initial estimate for the remaining work; use TBD until broken into tasks |
| Depends on | Work that must happen first |
| Acceptance criteria | Observable conditions for calling the feature done |

### Task fields

| Field | Meaning |
|---|---|
| Task ID | Stable identifier, e.g. CERT-03 |
| Task | Small, verifiable unit of work |
| Status | Todo / In Progress / Done / Blocked / Needs Audit |
| Estimate (h) | Expected focused work time |
| Actual (h) | Actual focused work time, filled after completion |
| Notes | Test evidence, blockers, or decisions |

### Status rules

- **Done** means implemented and verified against its acceptance criteria.
- **Needs Audit** means earlier context suggests it exists, but its current state or complete testing has not been confirmed.
- **Deferred** means intentionally postponed; it is not part of the current completion percentage.
- Do not invent estimates or percentages. Break remaining work into tasks first, then estimate each task.
- Keep implementation, testing, and deployment as distinct tasks.

---

## 2. Feature inventory

The statuses below reflect the latest known project context. Items marked **Needs Audit** need a quick check in the current branch before being treated as complete.

| ID | Feature | Status | Priority | Estimate (h) | Depends on |
|---|---|---|---|---:|---|
| F01 | Repository structure and client/server split | Done | P0 | 0 | — |
| F02 | Backend foundation and MongoDB connection | Done | P0 | 0 | F01 |
| F03 | Projects API and Cloudinary image handling | Done | P0 | 0 | F02 |
| F04 | Public Projects integration | Done | P0 | 0 | F03 |
| F05 | Admin authentication and protected routes | Done | P0 | 0 | F02 |
| F06 | Admin Projects management | Done | P0 | 0 | F03, F05 |
| F07 | Skills API and public integration | Done | P0 | 0 | F02 |
| F08 | Admin Skills management | Done | P0 | 0 | F07, F05 |
| F09 | Certificates API and image upload | Done | P0 | 0 | F02 |
| F10 | Public Certificates section | In Progress | P0 | TBD | F09 |
| F11 | Admin Certificates management | Needs Audit | P0 | TBD | F09, F05 |
| F12 | Contact section and message handling | Needs Audit | P0 | TBD | F02 |
| F13 | Admin Dashboard | Deferred | P1 | TBD | Core management features |
| F14 | End-to-end testing and bug fixing | Not Started | P0 | TBD | F04, F06, F08, F10, F11, F12 |
| F15 | Production configuration and deployment | Not Started | P0 | TBD | F14 |
| F16 | Final UI polish and responsive/accessibility pass | Not Started | P1 | TBD | Main public/admin features |

**Important:** “Done” above records previously reported implementation and testing, not a fresh inspection of every file in the repository. Reopen a row if a current-branch check finds missing work.

---

## 3. Task backlog

### F01 — Repository structure

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| STR-01 | Split frontend into `client/` and create `server/` | Done | — | — | Existing commits include `41635f9` and `0e93173` |

### F02 — Backend foundation

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| API-01 | Initialize Express server and ESM setup | Done | — | — | |
| API-02 | Connect MongoDB | Done | — | — | DNS workaround was added |
| API-03 | Configure app middleware and centralized errors | Done | — | — | |

### F03 / F04 / F06 — Projects

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| PROJ-01 | Implement Projects model and CRUD API | Done | — | — | |
| PROJ-02 | Add Cloudinary upload/delete handling | Done | — | — | |
| PROJ-03 | Connect public Projects grid to API | Done | — | — | Confirm featured/order behavior during final audit |
| PROJ-04 | Implement admin create/edit/delete flows | Done | — | — | |
| PROJ-05 | Final audit: validation, empty/error/loading states, mobile layout | Needs Audit | TBD | — | Reopen only for issues found |

### F05 — Admin authentication

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| AUTH-01 | User model, password hashing, and login endpoint | Done | — | — | |
| AUTH-02 | JWT verification middleware | Done | — | — | |
| AUTH-03 | Auth context, login UI, and protected admin routes | Done | — | — | |
| AUTH-04 | Final auth audit: invalid/expired token and logout behavior | Needs Audit | TBD | — | |

### F07 / F08 — Skills

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| SKL-01 | Implement Skills model and CRUD API | Done | — | — | API endpoints were tested |
| SKL-02 | Connect public Tools/Skills display to API | Done | — | — | |
| SKL-03 | Implement admin create/edit/delete flows | Done | — | — | |
| SKL-04 | Final audit: empty/error/loading states and responsive layout | Needs Audit | TBD | — | |

### F09 — Certificates API

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| CERT-API-01 | Implement Certificate model with multiple image records | Done | — | — | Each image stores `url` and `public_id` |
| CERT-API-02 | Implement list/get/create/update/delete endpoints | Done | — | — | CRUD was reported tested |
| CERT-API-03 | Upload certificate images to Cloudinary and clean up replaced/deleted images | Done | — | — | Frontend should restrict selection with `accept="image/*"`; backend image-only enforcement has not been confirmed |
| CERT-API-04 | Audit upload limits, invalid files, and failure cases | Needs Audit | TBD | — | Decide whether to add server-side image MIME validation |

### F10 — Public Certificates UI

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| CERT-PUB-01 | Add Certificates section to Home between Projects and Contact | Done | — | — | |
| CERT-PUB-02 | Fetch and render certificates from API | Done | — | — | `useCertificates` returns an empty array before data loads |
| CERT-PUB-03 | Build responsive CertificateCard with image navigation | In Progress | TBD | — | Previous/Next wraparound logic implemented; styling in progress |
| CERT-PUB-04 | Format certificate date for display | Todo | TBD | — | Prefer month + year unless exact day matters |
| CERT-PUB-05 | Implement full-certificate viewer/modal | Todo | TBD | — | Reuse viewer in admin if useful |
| CERT-PUB-06 | Handle loading, empty, and API error states | Needs Audit | TBD | — | |
| CERT-PUB-07 | Verify image aspect ratio, keyboard access, and mobile layout | Todo | TBD | — | |

### F11 — Admin Certificates management

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| CERT-ADM-01 | Confirm admin certificates list and routes exist | Needs Audit | TBD | — | |
| CERT-ADM-02 | Build create/edit form with multiple image upload | Todo | TBD | — | Use `FormData` and repeated `images` fields |
| CERT-ADM-03 | Build delete flow and confirmation | Todo | TBD | — | |
| CERT-ADM-04 | Add query invalidation and success/error feedback | Todo | TBD | — | |
| CERT-ADM-05 | Test full admin CRUD workflow | Todo | TBD | — | |

### F12 — Contact and message handling

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| CONTACT-01 | Inspect existing public Contact section and define required behavior | Needs Audit | TBD | — | Decide whether it is mailto-only or saves messages |
| CONTACT-02 | If required, implement backend message storage and validation | Needs Audit | TBD | — | Only create if the intended scope requires it |
| CONTACT-03 | Test contact submission and user feedback | Todo | TBD | — | |

### F13 — Admin Dashboard (deferred)

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| DASH-01 | Build dashboard from real project/skill/certificate data | Deferred | TBD | — | Explicitly postponed until other features are complete |

### F14 — End-to-end testing

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| QA-01 | Verify public sections and responsive navigation | Todo | TBD | — | |
| QA-02 | Verify every admin CRUD flow and protected endpoint | Todo | TBD | — | |
| QA-03 | Verify API errors, loading/empty states, and invalid input | Todo | TBD | — | |
| QA-04 | Check browser console and server logs | Todo | TBD | — | |
| QA-05 | Regression test after fixes | Todo | TBD | — | |

### F15 — Deployment

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| DEP-01 | Choose production hosting for client and server | Todo | TBD | — | |
| DEP-02 | Configure production environment variables and secrets | Todo | TBD | — | Never commit secrets |
| DEP-03 | Configure production CORS, API base URL, and database access | Todo | TBD | — | |
| DEP-04 | Deploy client and server | Todo | TBD | — | |
| DEP-05 | Smoke-test production routes, auth, uploads, and CRUD | Todo | TBD | — | |

### F16 — Final polish

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| POLISH-01 | Review visual consistency across public and admin pages | Todo | TBD | — | |
| POLISH-02 | Check mobile/tablet/desktop layouts | Todo | TBD | — | |
| POLISH-03 | Check accessible labels, focus states, and keyboard use | Todo | TBD | — | |
| POLISH-04 | Remove dead code and verify production build | Todo | TBD | — | |

---

## 4. Milestones

| Milestone | Exit criteria | Status |
|---|---|---|
| M0 — Foundation | Client/server structure, database connection, shared middleware | Done |
| M1 — Projects | Public Projects and admin CRUD work end to end | Done |
| M2 — Authentication | Admin login and protected routes work | Done |
| M3 — Skills | Public skills and admin CRUD work end to end | Done |
| M4 — Certificates | Public gallery and admin CRUD both work end to end | In Progress |
| M5 — Contact | Contact behavior is defined and tested | Needs Audit |
| M6 — Feature freeze | All P0 features complete; no known critical bugs | Not Started |
| M7 — Release | Production deployment and smoke tests pass | Not Started |
| M8 — Dashboard | Dashboard uses live data after core features ship | Deferred |

---

## 5. Time tracking

Append one row after each meaningful work session. Record focused work time, not breaks.

| Date | Task ID | Planned (h) | Actual (h) | Outcome / next step |
|---|---|---:|---:|---|
| — | — | — | — | Start logging from the next session |

After 3–5 completed tasks, compare estimates with actual time and adjust the remaining estimates. Until then, leave totals as TBD rather than implying false precision.

## 6. Working routine

1. At the start of a session, choose one task ID and confirm its dependencies are complete.
2. Record or revise its estimate before starting.
3. Work on that task; avoid adding polish tasks mid-session unless they block completion.
4. At the end, update status, actual hours, and the next concrete step.
5. Mark a feature Done only after its acceptance criteria and basic error cases pass.
6. Before deployment, finish all P0 work and reserve separate time for QA and fixes.

## 7. Decisions to confirm

- [ ] Is Contact intended to send email only, or store submissions in the database/admin?
- [ ] Should backend upload middleware strictly reject non-image files for certificates, or is frontend-only filtering acceptable for this project?
- [ ] Is Admin Certificates CRUD already implemented locally, or is it still to be built?
- [ ] Confirm the current deployment target for client/server before estimating deployment tasks.
