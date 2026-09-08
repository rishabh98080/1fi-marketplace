# Phase 06 — Product Details & EMI

## Goal

Implement the core Marketplace purchase-selection flow.

The assignment specifically requires:

- product image
- product name
- product pricing
- product variants
- EMI options/plans
- relevant product details
- ability to select an EMI plan
- CTA to proceed with the selected plan

## Page structure

```text
Product Details
│
├── Product Gallery
├── Product Information
├── Price
├── Variant Selector
├── EMI Plan Selector
├── Purchase Summary
└── Proceed CTA
```

## Variant flow

```text
Product
 ↓
Selected Variant
 ↓
Variant Price
 ↓
Available EMI Plans
```

Changing a variant should update dependent information.

## EMI selection

Use real component state:

```text
selectedVariant
selectedEmiPlan
```

The selected plan should be visually obvious.

## Purchase summary

Display values derived from the selected product/variant/EMI plan.

Do not duplicate the same business value in multiple unrelated places.

## CTA

The CTA should be disabled or guarded when required selections are missing.

## Deliverable

A complete product-detail selection experience with functional variant and EMI selection.
