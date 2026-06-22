# GitHub Copilot Code Review Instructions

This file provides guidance to Copilot Code Review for the **macpro-mdct-qmr** repository. The patterns below are drawn from recurring themes in past pull request reviews.

---

## How to Conduct Reviews

### Always explain why, not just what

Every comment must include the reason the issue matters — what will break, what will mislead, or what rule is being violated. A comment that only describes the problem without explaining the consequence gives the author no way to evaluate its importance or apply the lesson elsewhere.

### Flag repeated instances of the same issue once

If the same problem appears in multiple places within a PR (e.g., hardcoded year checks in five files), raise it in one comment that identifies the pattern and notes that it appears elsewhere. Do not post the same comment repeatedly — it creates noise and makes the review harder to act on.

### Note severity without blocking

All findings should be treated as suggestions — it is up to the human reviewers to determine whether something must be addressed before merging. However, do note the nature of each finding so reviewers can prioritize:

- Use **"Potential bug:"** for issues that may cause incorrect behavior or data loss.
- Use **"Accessibility:"** for violations that affect keyboard or screen reader users.
- Use **"Nitpick:"** for minor style or readability improvements.
- Use no prefix for general code quality suggestions.

### Be specific and actionable

Comments should tell the author exactly what to change and why. Vague feedback like "this could be improved" is not actionable. If a better approach exists, describe it or show a brief example.

### Do not comment on things outside the scope of the PR

Only flag issues introduced or directly touched by the PR. Do not raise pre-existing problems in unchanged code — that belongs in a separate ticket, not a review of unrelated work.

---

## Year-Based Feature Flags and Content

### Always use `featuresByYear` flags instead of direct year comparisons

Never gate behavior with inline year checks like `year >= 2026` or `getMeasureYear() !== <year>`. Always use named flags from `utils/featuresByYear.ts`, and add a new dedicated flag for each new feature — reusing an existing flag for unrelated behavior creates hidden coupling between features.

```ts
// ❌ Avoid
if (year >= 2026) { ... }

// ✅ Prefer
if (featuresByYear.myNewFeatureFlag) { ... }
```

### Always use `SharedContext` for year-specific copy instead of inlining it in components

Year-specific label and content changes belong in `labels/{year}/commonQuestionsLabel.tsx`, accessed via `useContext(SharedContext)`. Inlining copy changes directly in component logic scatters strings across the codebase, making it easy to miss updates when a new year is added.

### Test both paths when gating behavior by year

When a feature is gated by `featuresByYear.*`, prefer tests that cover both the old and new paths by mocking the measure year and asserting the expected behavior for each.

---

## TypeScript Type Correctness

### Prefer placing shared types in `GlobalTypes.tsx`

Prefer defining types used across multiple files in `services/ui-src/src/shared/types/GlobalTypes.tsx` over defining them inside year-specific label files or single-use modules.

### Prefer `satisfies` over redundant type annotations on local variables

Avoid adding explicit type annotations to local `const` declarations whose type TypeScript can fully infer — it adds noise without safety benefit. At module/export boundaries, explicit annotations are fine and often preferable as documentation.

If you want to validate that an object conforms to a type without widening it, prefer `satisfies`:

```ts
// ❌ Redundant — TS already infers this
const labels: CommonQuestionsLabelType = { ... };

// ✅ Validates shape without widening the inferred type
const labels = { ... } satisfies CommonQuestionsLabelType;
```

### Prefer `keyof typeof` over `string` for lookup key parameters

When a function looks up a value in an object by a string key, prefer typing the key as `keyof typeof obj` rather than `string`. This eliminates unsafe casts at call sites and surfaces errors earlier.

### Prefer separate parameters or options objects over polymorphic `string | boolean` parameters

When a function parameter changes meaning based on its type (e.g., `adultMeasure: boolean | string`), prefer refactoring to separate, clearly named parameters or an options object to avoid confusion at call sites.

---

## Form Field Keys and OMS Node IDs

### Form field names must use stable constants, not display text

Form field `name` attributes must never use question display text as the key — that key is what gets stored in the database, and display copy can change. Define short, stable constants in `dataConstants.ts` (e.g., `DC.REPORTING_STRATIFICATION`) and reference them throughout.

### OMS node IDs must be `\w`-only (no hyphens or spaces)

`cleanString()` strips all non-`\w` characters when building form keys and accordion expansion logic. Using hyphens or spaces in `OmsNode.id` will silently mangle keys, causing lookup mismatches and broken error locations.

```ts
// ❌ Don't
{ id: "foster-care", label: "Foster Care" }

// ✅ Do — use a \w-only identifier (e.g. generated via https://shortunique.id/)
{ id: "Crt5ab", label: "Foster Care" }
```

---

## Code Structure and Readability

### Prefer early returns over nested conditional JSX

Complex conditional rendering is easier to read with early returns rather than nested ternaries:

```tsx
// ❌ Avoid
return data.measureType ? (
  data.typeTagForCoreSets && !data.typeTagForCoreSets.includes(data.coreSet) ? (
    <></>
  ) : (
    <Badge>...</Badge>
  )
) : (
  <></>
);

// ✅ Prefer — one condition per return path
if (
  !data.measureType ||
  (data.typeTagForCoreSets && !data.typeTagForCoreSets.includes(data.coreSet))
) {
  return <></>;
}
return <Badge>...</Badge>;
```

### Prefer `if` statements or helper functions over deep ternary chains

When a ternary has more than two levels, prefer converting it to `if` statements or extracting a helper function. This is especially valuable in validation logic.

### Prefer including needed fields at the mapping step over prop-drilling full collections

If a child component only needs a subset of a data item, prefer including those fields when building the mapped array in the parent rather than passing the entire source collection down and calling `.find()` inside the child.

---

## React Correctness

### Prefer fragments over wrapper elements when no styling is needed

```tsx
// ❌ Avoid
<CUI.Box>{children}</CUI.Box>

// ✅ Prefer
<>{children}</>
```

### Never call `cleanup()` manually in tests

`@testing-library/react` automatically cleans up the DOM between tests. Manual `cleanup()` calls are unnecessary and can hide test isolation issues.

### Never mark functions as `async` unless they contain `await`

An `async` function with no `await` wraps its return value in an unnecessary `Promise`, adds async scheduling overhead, and will trigger `require-await` lint errors. This applies to all functions — test hooks (`beforeEach`, `afterEach`), callbacks, and regular functions alike.

---

## Accessibility

### Links must have an `href` attribute to be keyboard-accessible

An anchor element without an `href` is not focusable via keyboard and cannot be activated by keyboard users or assistive technology. This is a WCAG requirement, not a preference.

### Never place non-list-item elements inside `<ul>` or `<ol>`

Elements like `<CUI.Spacer>`, `<Heading>`, or `<div>` are invalid children of list elements and harm screen reader accessibility. Place headings outside the list; use margins or padding for spacing.

### Prefer a single, consistent focus indicator

When adding a custom `outline` focus style, ensure the component's default `box-shadow` focus ring (from Chakra or the browser) is also removed so users see one clear, consistent focus indicator.

---

## Scope Completeness

### Check sibling measure variants when updating per-measure files

Many measures exist as coreset-specific siblings sharing a base name (e.g., `COLAD`/`COLHH`, `FUAAD`/`FUACH`/`FUAHH`). The suffix indicates the coreset: `AD` (Adult), `CH` (Child), `HH` (Home Health/Hybrid). When a change is made to one variant's `data.ts`, `questions/`, or any other per-measure file, check whether the sibling variants with the same base name need the same change.

### Check all measure files in a year when updating a shared pattern

There are 76+ individual measures per year, each with their own `data.ts`. When a copy or behavior change applies to a shared pattern across measures (e.g., all 2026 measures use a renamed data source label), verify that every affected measure file is updated.

### Always remove surrounding dead code when deleting a feature

When removing a property or flag, check whether surrounding conditional logic that existed solely to read that property can also be removed. Leaving dead code in place misleads future maintainers into thinking it still serves a purpose.

---

## Code Comments and Documentation

### Always update comments to reflect the current implementation after refactoring

Stale block comments that reference a previous library, algorithm, or behavior are misleading to anyone reading the code later. When refactoring, update all comments to describe what the code actually does now.

### Prefer JSDoc comments on non-obvious exported types and fields

When adding a new field to a shared type or following an unusual convention, prefer adding a brief JSDoc comment explaining its purpose rather than leaving it undocumented.

---

## Styling

### Prefer Chakra UI theme color variables over hardcoded hex values

Prefer referencing named color tokens (e.g., `gray.600`) over hardcoding hex values. If the right shade is not available in the default theme, add an override in `styles/foundations/colors.ts`.
