# Phase 05 — Product Listing

## Goal

Create a proper browsing experience for Marketplace products.

## Required behavior

### Search

Users can search product data.

Do not use product-specific conditions such as:

```text
if search == "iphone"
```

Instead, search the product collection.

### Categories

Category selection should filter dynamically.

### Filters

Potential filters:

- category
- brand
- price range
- EMI tenure
- availability

Only implement filters supported by the actual data model/assignment scope.

### Sorting

Possible options:

```text
Relevance
Price: Low to High
Price: High to Low
Newest
```

Only expose options that have meaningful data behind them.

## Suggested architecture

```text
MarketplaceListingPage
│
├── SearchBar
├── FilterPanel
├── SortSelector
└── ProductGrid
      └── ProductCard
```

## State

Keep listing state separate:

```text
search
category
filters
sort
```

## Deliverable

A data-driven product listing page with reusable filtering/search/sorting behavior.
