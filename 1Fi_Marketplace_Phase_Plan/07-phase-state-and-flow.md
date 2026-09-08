# Phase 07 — State & User Flow

## Goal

Keep state predictable and scoped to the correct part of the application.

## Local state

Marketplace listing:

```text
search
category
filters
sort
```

Product details:

```text
selectedImage
selectedVariant
selectedEmiPlan
```

## Shared/global state

Only introduce global state if the existing application already uses it or the flow genuinely requires it.

Do not add Redux/Zustand/etc. merely for the assignment.

## Navigation flow

```text
Shop
 ↓
1Fi Marketplace
 ↓
Marketplace Home
 ↓
Product Listing
 ↓
Product Details
 ↓
Select Variant
 ↓
Select EMI
 ↓
Proceed
```

## Navigation requirements

- preserve existing application routing conventions
- support back navigation
- avoid unnecessary full-page reloads
- keep route parameters/data identifiers stable

## Deliverable

A coherent end-to-end Marketplace flow with state isolated to the appropriate layer.
