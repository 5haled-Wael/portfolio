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
| F17 | Personal profile content management (Hero/About/education) | Not Started | P0 | TBD | F02, F05 |
| F18 | Profile image and CV management | Needs Audit | P1 | TBD | F02, F05 |
| F19 | Contact details and social links management | Not Started | P1 | TBD | F02, F05 |
| F20 | Site-wide content/settings (stats, availability, navigation/footer) | Needs Audit | P1 | TBD | F02, F05 |

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

### F17 — Personal profile content management

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| PROFILE-01 | Audit static profile data used by Hero and About | Needs Audit | TBD | — | Start from `personalInfo.js` |
| PROFILE-02 | Define editable profile fields and validation | Todo | TBD | — | Name, role/title, subtitle, About, university, graduation year |
| PROFILE-03 | Implement profile model/API for reading and updating profile content | Todo | TBD | — | Confirm single-profile document vs settings document before coding |
| PROFILE-04 | Connect public Hero/About/education content to API | Todo | TBD | — | Preserve current design |
| PROFILE-05 | Build protected admin edit form | Todo | TBD | — | One profile record; no public create/delete flow needed |
| PROFILE-06 | Test validation, loading/error states, and public updates | Todo | TBD | — |

### F18 — Profile image and CV management

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| MEDIA-01 | Locate current profile image and CV/download link | Needs Audit | TBD | — | Confirm current implementation before choosing storage |
| MEDIA-02 | Decide whether profile image/CV use Cloudinary or static assets | Todo | TBD | — | Consider file types, replacement, and deployment |
| MEDIA-03 | Implement admin upload/replacement workflow if in scope | Todo | TBD | — | |
| MEDIA-04 | Connect Hero/profile image and CV link to managed data | Todo | TBD | — | |
| MEDIA-05 | Test upload, replacement, and public download/display | Todo | TBD | — |

### F19 — Contact details and social links management

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| SOCIAL-01 | Audit current contact/social URLs and email/WhatsApp links | Needs Audit | TBD | — | Current values appear in static source |
| SOCIAL-02 | Define editable contact fields and validation | Todo | TBD | — | Email, GitHub, LinkedIn, WhatsApp, and any confirmed links |
| SOCIAL-03 | Implement API and protected admin edit form | Todo | TBD | — | |
| SOCIAL-04 | Connect public Contact section and footer links to managed data | Todo | TBD | — | |
| SOCIAL-05 | Test links, missing optional values, and form feedback | Todo | TBD | — |

### F20 — Site-wide content and settings

| Task ID | Task | Status | Estimate (h) | Actual (h) | Notes |
|---|---|---|---:|---:|---|
| SETTINGS-01 | Inventory static stats, availability badge, navigation labels/anchors, and footer content | Needs Audit | TBD | — | |
| SETTINGS-02 | Decide which site-wide values need admin editing | Todo | TBD | — | Avoid overengineering; derive project/skill/certificate counts where possible |
| SETTINGS-03 | Implement approved settings fields/API/admin UI | Todo | TBD | — | |
| SETTINGS-04 | Connect approved settings to public UI | Todo | TBD | — | |
| SETTINGS-05 | Test fallback behavior for missing optional settings | Todo | TBD | — |

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
| M5 — Content management | Profile, contact/social, media, and approved site settings can be edited from Admin | Not Started |
| M6 — Contact behavior | Public contact flow is defined and tested | Needs Audit |
| M7 — Feature freeze | All P0 features complete; no known critical bugs | Not Started |
| M8 — Release | Production deployment and smoke tests pass | Not Started |
| M9 — Dashboard | Dashboard uses live data after core features ship | Deferred |

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

- [ ] Confirm whether Contact stays email-service based or needs a database-backed message inbox; current code calls `sendEmail`.
- [ ] Confirm backend image-only validation for certificate uploads; frontend `accept="image/*"` is not server-side enforcement.
- [ ] Confirm whether Admin Certificates CRUD already exists locally or still needs implementation.
- [ ] Audit current profile image and CV implementation and whether both must be editable from Admin.
- [ ] Approve which static values (profile, contact/social links, stats, availability, footer) should be admin-managed.
- [ ] Confirm deployment target for client/server before estimating deployment tasks.
