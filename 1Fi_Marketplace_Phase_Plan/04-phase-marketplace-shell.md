# Phase 04 — Marketplace Shell

## Goal

Build the main 1Fi Marketplace experience using the provided visual direction.

## Page structure

```text
Marketplace
│
├── Header / Navigation
├── Hero
├── Categories
├── Featured Products
├── Best Sellers
└── Best Deals
```

The supplied reference uses the product groupings **Featured Products**, **Best Sellers**, and **Best Deals**.

## Hero

Use the visual language of the supplied reference:

```text
Shop today.
Pay later using
mutual funds.

[Primary CTA] [Secondary CTA]
```

Exact copy should follow the approved/reference content where applicable.

## Categories

Render dynamically:

```text
categories.map(...)
```

Do not create separate hardcoded JSX blocks for each category.

## Product sections

Each section should consume data:

```text
Featured
Best Sellers
Best Deals
```

The page should not contain individual product definitions.

## Components

Suggested:

```text
MarketplacePage
MarketplaceHero
CategoryList
CategoryCard
ProductSection
ProductGrid
ProductCard
```

## Deliverable

A responsive Marketplace home page connected to the data layer.
