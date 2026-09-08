# Phase 10 — Testing & Submission

## Goal

Validate the implementation against the assignment rather than only checking whether the page visually works.

## Functional checklist

- [ ] Marketplace opens from Shop
- [ ] Top Brands remains untouched/blank as required
- [ ] Nearby Stores remains untouched/blank as required
- [ ] Products load through the data layer
- [ ] Product images render
- [ ] Product names render
- [ ] Pricing renders
- [ ] Variants work
- [ ] EMI plans load
- [ ] EMI selection works
- [ ] Proceed CTA reflects selection
- [ ] Search works
- [ ] Filters work where implemented
- [ ] Sorting works where implemented
- [ ] Product detail navigation works
- [ ] Back navigation works

## Engineering checklist

- [ ] No product data hardcoded in UI components
- [ ] No EMI data hardcoded in UI components
- [ ] No duplicated product card implementations
- [ ] Reusable components
- [ ] Clear service/API boundary
- [ ] State is appropriately scoped
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Responsive implementation
- [ ] Existing app architecture respected

## Visual checklist

- [ ] 1Fi visual language preserved
- [ ] Purple accent used consistently
- [ ] Typography matches existing app
- [ ] Spacing is consistent
- [ ] Cards have consistent treatment
- [ ] CTA hierarchy is clear
- [ ] Mobile layout is polished

## Final code review

Search the codebase for accidental hardcoding:

```text
product names
prices
EMI amounts
category names
variant definitions
image paths
API URLs
```

Business data should originate from the data/API layer.

## Final README

Document:

```text
Project overview
Architecture
Data flow
Mock API approach
How to run
How to replace mock API with backend
Key implementation decisions
```

## Definition of Done

The submission should demonstrate:

1. Product understanding
2. UI/UX consistency
3. Engineering quality
4. Functional completeness
5. Good data/API handling
6. Attention to detail
