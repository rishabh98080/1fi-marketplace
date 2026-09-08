# 1Fi Marketplace Assignment — Phase Plan

This folder contains the implementation plan for the 1Fi Marketplace assignment.

## Source requirements

The assignment requires adding a fully designed and implemented **1Fi Marketplace** section inside the existing Shop experience. Top Brands and Nearby Stores require no implementation. The Marketplace must support product listing and relevant product/EMI information, including product images, names, pricing, variants, EMI plans, EMI selection, and a CTA to proceed with the selected plan.

## Core engineering rule

**Do not hardcode product, variant, pricing, category, or EMI data inside UI components.**

Use this architecture:

```text
UI
 ↓
Hooks / State
 ↓
Marketplace Service
 ↓
Mock API / Real API
 ↓
Data
```

## Phases

1. [Phase 01 — Existing App Audit](./01-phase-existing-app-audit.md)
2. [Phase 02 — Design System & Theme](./02-phase-design-system.md)
3. [Phase 03 — Data Models & API Layer](./03-phase-data-api.md)
4. [Phase 04 — Marketplace Shell](./04-phase-marketplace-shell.md)
5. [Phase 05 — Product Listing](./05-phase-product-listing.md)
6. [Phase 06 — Product Details & EMI](./06-phase-product-details-emi.md)
7. [Phase 07 — State & User Flow](./07-phase-state-and-flow.md)
8. [Phase 08 — Loading, Error & Empty States](./08-phase-resilience.md)
9. [Phase 09 — Responsive UI & Polish](./09-phase-responsive-polish.md)
10. [Phase 10 — Testing & Submission](./10-phase-testing-submission.md)

## Definition of Done

The implementation should be reusable, data-driven, responsive, consistent with the existing 1Fi application, and ready to replace mock data with a real API without rewriting the UI.
