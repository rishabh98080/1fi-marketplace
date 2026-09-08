# Phase 08 — Loading, Error & Empty States

## Goal

Make the Marketplace behave like a real application rather than a static demo.

The assignment evaluates loading/error states and overall engineering quality.

## Loading

When product data is loading:

```text
Skeleton Product Cards
```

Avoid blocking the entire application with a generic spinner if component-level skeletons are practical.

## Error

Show a user-friendly state:

```text
Something went wrong.

We couldn't load the products.

[Try Again]
```

The retry action should actually repeat the failed operation.

## Empty

For no search/filter results:

```text
No products found.

Try changing your search or filters.
```

## Missing data

Components should gracefully handle:

- missing image
- missing optional description
- unavailable variant
- unavailable EMI plan

## Deliverable

Every async/data-driven surface has intentional loading, error, and empty behavior.
