# TribalOne — Agent Instructions

## 1. Project Overview

TribalOne is an AI-enabled scholarship and fellowship management platform for the Ministry of Tribal Affairs.

The long-term system is intended to support scholarship and fellowship schemes such as:

* National Fellowship for Scheduled Tribes (NFST)
* National Overseas Scholarship (NOS)
* Top Class Education
* Future schemes through configurable scheme definitions

The product supports applicants, ministry administrators, institute officials, and other operational roles described in `PRD.md`.

This repository will be developed incrementally.

The current implementation may be a frontend prototype, while the eventual goal is a production-oriented full-stack application.

---

## 2. Sources of Truth

Always distinguish between the following files:

### `PRD.md`

The product source of truth.

Use it for:

* product requirements
* user roles
* workflows
* business rules
* functional requirements
* non-functional requirements
* future capabilities
* system behavior

Do not invent major product requirements that contradict the PRD.

### `design.md`

The global UI/UX and visual source of truth.

Use it for:

* visual language
* colors
* typography
* spacing
* layouts
* navigation
* component behavior
* accessibility principles
* status representation
* applicant/admin design differences

### Stitch designs

Stitch designs are the visual reference for individual screens.

When implementing a screen, inspect the relevant Stitch design before creating or substantially modifying the UI.

Do not redesign a screen without a concrete reason.

### `AGENTS.md`

This file contains persistent engineering instructions for working on the project.

These rules apply unless a newer explicit project instruction supersedes them.

---

# 3. Core Engineering Principles

## 3.1 Understand before modifying

Before making significant changes:

1. Inspect the existing project structure.
2. Read the relevant source files.
3. Understand the current architecture.
4. Identify dependencies between the code being changed and existing functionality.
5. Make the smallest appropriate change.

Do not blindly rewrite existing code.

---

## 3.2 Preserve working functionality

Existing working functionality should not be rewritten merely because another implementation is possible.

When adding a feature:

* extend existing abstractions where appropriate
* reuse existing components
* reuse existing services
* reuse existing validation
* reuse existing types
* avoid unnecessary duplication

If a change requires breaking an existing abstraction, explain why before doing so when the change is significant.

---

## 3.3 Avoid overengineering

This project will eventually become a production system, but development must happen incrementally.

Do not implement future infrastructure prematurely.

Do not introduce technologies merely because they appear in the long-term PRD.

Examples of things that should not automatically be implemented during the frontend phase:

* microservices
* event buses
* Kubernetes
* distributed systems
* real OCR
* real AI models
* PFMS integration
* DigiLocker integration
* Aadhaar/eKYC integration
* production cloud infrastructure
* complex caching systems
* unnecessary state-management frameworks

Implement the simplest architecture that preserves a clean path toward the eventual production system.

---

# 4. Current Frontend Architecture

The frontend is intended to eventually communicate with a real backend through a service/API abstraction.

Preferred architecture:

```text
React UI
    ↓
Pages / Components
    ↓
Frontend Service / API Layer
    ↓
Mock Services (current prototype)
```

Eventually:

```text
React UI
    ↓
Pages / Components
    ↓
Frontend Service / API Layer
    ↓
FastAPI
    ↓
PostgreSQL / Storage / Other Services
```

The UI should not be tightly coupled to mock data.

Do not scatter hardcoded application data throughout React components.

Prefer:

```text
Component
    ↓
Service
    ↓
Data
```

rather than:

```text
Component
    ↓
Hardcoded mock object
```

This is important because the mock implementation will eventually be replaced with real API calls.

---

# 5. Frontend Technology

Unless explicitly changed by the project architecture, use:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* React Hook Form
* Recharts for appropriate charts
* Lucide React for icons

Avoid adding dependencies unless they provide meaningful value.

Before adding a new dependency, check whether the existing project already provides the required functionality.

---

# 6. TypeScript Rules

Use TypeScript properly.

Prefer explicit domain types/interfaces for important application data.

Examples include:

* User
* Applicant
* Application
* Scheme
* Document
* Verification
* Deficiency
* Notification
* Audit event

Avoid unnecessary use of:

```ts
any
```

Use appropriate types instead.

Do not use type assertions simply to silence TypeScript errors unless the assertion is actually justified.

Fix the underlying type problem where practical.

---

# 7. Mock Data Rules

During the frontend-only phase, backend-dependent behavior must be simulated.

However, mock behavior should resemble the eventual real system.

Mock data should be:

* realistic
* deterministic where appropriate
* structured according to domain concepts
* centralized
* reusable
* separate from presentation components

Do not use real personal information.

Use fictional applicants, application IDs, documents and other data.

Mock services should expose operations similar to the future backend APIs.

For example:

```text
getApplications()
getApplication(id)
createApplication()
updateApplication()
submitApplication()
getDocuments()
uploadDocument()
createDeficiency()
resolveDeficiency()
approveApplication()
rejectApplication()
```

Exact names may differ according to the approved architecture.

---

# 8. Shared Application State

Applicant and administrator views must represent the same underlying application state.

For example:

```text
Applicant submits application
        ↓
Application becomes visible to administrator
        ↓
Administrator raises deficiency
        ↓
Applicant sees deficiency
        ↓
Applicant submits correction
        ↓
Administrator sees updated application
        ↓
Administrator makes decision
        ↓
Applicant tracking reflects decision
```

Do not maintain independent fake versions of the same application in different pages.

Use the approved state/service architecture.

For prototype persistence, localStorage may be used where appropriate.

Do not treat localStorage as production persistence.

---

# 9. Application State Machine

Application statuses must not be changed arbitrarily.

The application lifecycle is defined by the PRD and approved architecture.

Examples include:

* Draft
* Submitted
* Document Verification
* Eligibility Verification
* Under Review
* Deficiency Raised
* Resubmission Required
* Screening
* Selected
* Not Selected
* Approved
* Completed

The exact states and transitions must follow the approved implementation.

When adding a new transition:

1. Identify the previous state.
2. Identify the new state.
3. Identify who is allowed to trigger it.
4. Identify what data must change.
5. Identify whether an audit event is required.
6. Identify whether a notification is required.

Do not implement arbitrary status changes simply to make a UI demo work.

---

# 10. AI and Automated Verification

AI is an assistance mechanism, not the final decision-maker.

The product must clearly distinguish between:

1. Automated/system findings
2. AI-assisted findings
3. Human verification
4. Final administrative decisions

Use language such as:

* AI-assisted verification
* Potential issue detected
* Recommended for review
* Requires administrator verification

Do not represent AI recommendations as final decisions.

Do not implement autonomous rejection or approval unless the approved product architecture explicitly requires it.

During the prototype phase, AI behavior should be deterministic mock behavior.

Real AI/OCR integration will be introduced in a later phase.

---

# 11. UI/UX Rules

Follow `design.md` and the Stitch designs.

The product should feel like a trustworthy government digital-service platform.

Avoid:

* excessive gradients
* glassmorphism
* neon colors
* excessive animations
* gaming aesthetics
* generic startup/SaaS styling
* unnecessary visual effects

Prefer:

* clear hierarchy
* readable typography
* predictable navigation
* strong status communication
* accessible forms
* clear calls to action
* useful whitespace
* responsive layouts
* meaningful empty/loading/error states

Do not make subjective redesigns when a Stitch design already exists.

---

# 12. Accessibility

Accessibility is a first-class requirement.

Where practical:

* use semantic HTML
* provide labels for form fields
* maintain sufficient contrast
* ensure keyboard accessibility
* provide visible focus states
* do not rely only on color to communicate status
* provide meaningful error messages
* use appropriate ARIA attributes where necessary

Follow the accessibility requirements described in `PRD.md` and `design.md`.

---

# 13. Forms

Use the approved form architecture.

Forms should have:

* clear labels
* required-field indicators
* validation
* useful error messages
* loading/submission states
* save-draft behavior where required
* previous/next navigation where applicable

Do not lose user-entered data unnecessarily when navigating between steps.

Do not silently discard unsaved changes.

---

# 14. API Boundary

When the real backend is introduced, frontend components should continue using the service/API abstraction.

Prefer:

```text
Page
 ↓
Hook / Service
 ↓
API client
 ↓
FastAPI
```

Avoid:

```text
Page
 ↓
fetch(...)
```

scattered throughout many components.

Centralize:

* API base URL
* authentication handling
* common headers
* serialization
* error handling
* request behavior

The frontend should not contain backend business rules that belong on the server.

---

# 15. Backend Principles

When backend development begins, use the architecture approved for the project.

The backend should separate:

```text
API layer
    ↓
Business/service layer
    ↓
Data access/repository layer
    ↓
Database
```

Do not put complex business logic directly inside route handlers.

Keep:

* database models
* API schemas
* domain/business logic
* authentication
* authorization
* data access

appropriately separated.

The backend must enforce security and business rules independently of the frontend.

---

# 16. Backend Technology

The planned backend stack is:

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy 2.x
* Alembic
* Pydantic v2
* Pydantic Settings

Use async database access where appropriate.

Do not introduce additional infrastructure without a clear requirement.

---

# 17. Database Rules

Database schema changes must use Alembic migrations.

Do not manually modify the production schema.

Use:

* foreign keys
* unique constraints
* appropriate indexes
* appropriate nullability
* timestamps
* database-level integrity constraints where appropriate

Do not blindly expose database models directly as API responses.

Use dedicated API schemas.

---

# 18. Authentication and Authorization

Authentication and authorization are backend responsibilities.

Never rely on the frontend to enforce security.

For protected resources, the backend must verify:

* identity
* authentication
* authorization
* resource ownership/access scope

Role-based access should support the project's roles.

At minimum for the MVP:

* Applicant
* Ministry Administrator

The architecture should allow future roles such as:

* Institute Official
* Leadership
* Finance/PFMS Nodal
* Help-desk/Grievance Officer

Never store plaintext passwords.

Never expose secrets or private credentials in frontend code.

---

# 19. Documents and Sensitive Data

Documents may contain sensitive personal information.

Treat them as private by default.

Do not:

* expose private storage paths
* log document contents
* expose unnecessary personal information
* trust client-provided authorization
* assume a file is safe based only on its extension

Document access must be authorized by the backend.

Keep document storage behind an abstraction so storage providers can be changed later.

---

# 20. Auditability

Important actions should be auditable.

Examples:

* application submission
* state transitions
* document verification
* deficiency creation
* correction submission
* administrative decision
* important configuration changes

Audit records should include appropriate:

* actor
* role
* action
* entity
* entity ID
* timestamp
* relevant state transition
* relevant metadata

Do not store unnecessary sensitive information in audit logs.

---

# 21. Error Handling

Never silently ignore errors.

Handle errors at the appropriate layer.

Frontend should provide useful user-facing states.

Backend should provide consistent API errors.

Avoid exposing:

* stack traces
* database internals
* secrets
* unnecessary implementation details

to end users.

When debugging, inspect the actual underlying error rather than hiding it with fallback behavior.

---

# 22. Testing

Every significant feature should be tested.

Frontend testing should include where appropriate:

* component behavior
* form validation
* navigation
* state transitions
* service behavior
* important user flows

Backend testing should include:

* authentication
* authorization
* validation
* business rules
* state transitions
* database operations
* API behavior
* important security boundaries

At minimum, manually verify the complete user journey after major frontend changes.

---

# 23. Verification After Changes

After implementing a meaningful change:

1. Run the relevant tests.
2. Run TypeScript checks for frontend changes.
3. Run the frontend build where appropriate.
4. Run backend tests for backend changes.
5. Check browser console errors for UI work.
6. Check API errors for backend/API work.
7. Verify the affected user flow.
8. Fix errors introduced by the change.

Do not report a feature as complete merely because the code was written.

It must actually run.

---

# 24. Debugging Rules

When an error occurs:

1. Read the actual error.
2. Identify the layer where it originates.
3. Trace the data/control flow.
4. Determine the root cause.
5. Fix the root cause.
6. Re-run the affected flow.

Do not randomly modify unrelated files until the error disappears.

Do not hide errors with:

* unnecessary try/catch blocks
* empty error handlers
* arbitrary fallback values
* disabling TypeScript checks
* disabling linting
* removing validation

---

# 25. Changes to Existing Architecture

If a requested feature conflicts with the existing architecture:

Do not silently create a second architecture.

Instead:

1. Explain the conflict.
2. Identify the affected components.
3. Propose the smallest architectural change.
4. Implement it consistently after approval when the change is significant.

Avoid architectural drift.

---

# 26. Git-Friendly Development

Make changes in coherent logical units.

Avoid mixing unrelated changes.

For example, do not combine:

* authentication refactoring
* dashboard redesign
* database migration
* unrelated UI cleanup

into one change unless there is a genuine dependency.

Keep the project easy to review and revert.

---

# 27. Production vs Prototype

Always determine which phase the project is currently in.

### Prototype phase

Allowed:

* mock services
* mock authentication
* localStorage
* deterministic AI findings
* mock analytics
* simulated integrations

Not allowed:

* pretending mock behavior is a real external integration
* hardcoding architecture that prevents future API integration

### Production backend phase

Replace mock behavior progressively with:

* real authentication
* real database
* real APIs
* real document storage
* real authorization
* real audit logging
* appropriate background processing

Do not replace everything in one giant rewrite.

---

# 28. Future Integrations

The PRD contains future integrations and capabilities including:

* OCR
* AI/document intelligence
* DigiLocker
* PFMS
* SMS/email
* additional schemes
* advanced analytics
* renewal
* payment reconciliation

These should be introduced through clean abstractions.

Do not tightly couple the core application domain to a single external provider.

For example:

```text
Application
    ↓
Verification Service
    ↓
Verification Provider
    ↓
OCR / AI Provider
```

rather than embedding provider-specific logic throughout application code.

---

# 29. Working With Stitch

When Stitch designs are available:

1. Inspect the relevant design.
2. Identify the intended layout.
3. Identify important interactions.
4. Implement the design using existing project components.
5. Preserve the visual hierarchy.
6. Adapt responsively where necessary.

Do not blindly copy generated code from a design tool if it conflicts with the project's architecture.

Stitch is a visual reference, not the application's architectural authority.

---

# 30. Working With MCP

MCP tools are development-time tools.

Do not treat MCP as part of the production application architecture unless explicitly required.

Use connected MCP tools to inspect relevant design/context when needed.

Do not add MCP-specific dependencies to the production frontend or backend merely because MCP was used during development.

---

# 31. Handling Ambiguity

When requirements are ambiguous:

### Minor implementation detail

Use reasonable judgment and maintain consistency with the existing architecture.

### Major product decision

Do not invent behavior silently.

Identify the ambiguity and ask for clarification or propose options.

Major decisions include:

* changing user flow
* changing application states
* changing role permissions
* changing database relationships
* changing API contracts
* changing authentication architecture
* changing major UI behavior

---

# 32. Before Starting Any Major Task

Before implementing a major task:

1. Read the relevant part of `PRD.md`.
2. Read the relevant part of `design.md`.
3. Inspect the existing implementation.
4. Inspect relevant Stitch designs.
5. Identify reusable components/services.
6. Identify affected routes and state.
7. Identify API/service boundaries.
8. Implement only the requested scope.

Do not assume the codebase is empty.

---

# 33. After Completing Any Major Task

Report:

* what was implemented
* which files/components were changed
* what behavior was added
* what was tested
* whether build/type checks passed
* any known limitations
* any follow-up work that is genuinely required

Do not claim something is complete if it has not been tested.

---

# 34. General Rule

The goal is not to generate the maximum amount of code.

The goal is to build a maintainable system incrementally.

Prefer:

```text
simple
clear
typed
testable
modular
consistent
```

over:

```text
clever
over-engineered
duplicated
tightly coupled
hard to change
```

Always preserve a clean path from the current prototype to the eventual full-stack TribalOne platform.
