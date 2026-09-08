# Phase 02 — Design System & Theme

## Goal

Translate the provided 1Fi reference/screenshot into reusable visual tokens while preserving the existing app's visual language.

The reference emphasizes:

- clean fintech aesthetic
- generous whitespace
- rounded cards
- purple primary accents
- high-contrast typography
- soft purple surfaces
- prominent CTAs

## Tasks

### 1. Identify tokens

Define/reuse:

- primary color
- text colors
- muted text
- page background
- surface/card background
- border color
- spacing scale
- border radius
- typography scale
- shadows

### 2. Reuse existing tokens first

If the starter project already has a theme/design system:

**extend it instead of creating a second design system.**

### 3. Component primitives

Identify or create reusable:

- Button
- Badge
- Card
- Search input
- Select/dropdown
- Loader
- Skeleton
- Empty state
- Error state

## Hardcoding rule

Design tokens may be static.

Business data must not be.

### Allowed

```text
theme.colors.primary
theme.spacing.md
theme.radius.lg
```

### Not allowed

```text
<Product name="iPhone 17" price="139900" />
```

inside page-level UI.

## Deliverable

A consistent visual foundation that Marketplace components can consume without repeating visual constants.
