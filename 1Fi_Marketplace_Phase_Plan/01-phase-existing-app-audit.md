# Phase 01 — Existing App Audit

## Goal

Understand the existing 1Fi codebase before changing it.

The assignment explicitly asks for consistency with the existing application architecture, UI components, navigation, typography, spacing, and overall experience.

## Tasks

### 1. Identify the stack

Inspect:

- `package.json`
- application entry point
- build configuration
- routing
- styling solution
- component library
- state management
- API/data layer
- TypeScript configuration, if present

### 2. Find the existing Shop page

Document:

- route
- page/component location
- existing Shop navigation
- existing tabs/options
- reusable components
- existing responsive behavior

### 3. Find existing design primitives

Look for:

- buttons
- cards
- typography
- spacing
- colors
- icons
- modals
- inputs
- loaders
- navigation components

### 4. Find existing data conventions

Determine:

- API client pattern
- service naming
- hooks
- query/caching library
- error handling
- loading patterns
- environment variables

## Deliverable

Create a short internal audit note containing:

```text
Framework:
Styling:
Routing:
State:
API:
Existing Shop:
Reusable UI:
Theme:
```

## Rules

- Do not redesign the existing application.
- Do not introduce a new library when an existing solution already handles the requirement.
- Reuse existing architecture wherever practical.
