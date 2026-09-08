# Phase 03 — Data Models & API Layer

## Goal

Build a data layer that keeps product/EMI information outside UI components.

The assignment explicitly says product and EMI information should be dynamically retrievable and allows mock APIs/data sources where backend integration is unavailable.

## Core entities

### Product

Suggested structure:

```text
id
name
brand
category
description
images
pricing
variants
emiPlanIds
specifications
badges
sections
```

### Variant

```text
id
name
attributes
price
image
available
```

### EMI Plan

```text
id
productId
variantId
tenureMonths
interestRate
monthlyAmount
totalAmount
processingFee
approvalType
```

### Category

```text
id
name
slug
image/icon
```

## Data flow

```text
Component
    ↓
Hook
    ↓
Marketplace Service
    ↓
Mock API / Backend API
    ↓
Data source
```

## Service functions

Implement according to the project's existing conventions:

```text
getProducts()
getProductById(id)
getCategories()
getEmiPlans(productId, variantId)
```

Optional:

```text
searchProducts()
filterProducts()
sortProducts()
```

## Important

The UI should not import raw mock arrays directly.

Prefer:

```text
useProducts()
  → marketplaceApi
  → data source
```

This makes switching from mock API to a real backend straightforward.

## Deliverable

A typed/structured data layer with a clear API boundary.
