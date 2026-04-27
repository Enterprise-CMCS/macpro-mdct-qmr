# Cypress Testing

[Cypress](https://www.cypress.io/features) is an open source testing tool used for end-to-end (E2E) and integration tests.

## Getting Started

- `yarn test` Runs two parallel processes:
  - `yarn start` (wrapper to `./run local`) runs the local application
  - `yarn cypress` opens Cypress using Chrome against the local instance
- `yarn test:ci` Used in pipelines/actions; runs Cypress headless against branch-specific instances

## Configuration

`cypress.config.ts` may use any of [these](https://docs.cypress.io/guides/references/configuration#Global) config options.

## Cypress CLI

The [Cypress CLI](https://docs.cypress.io/guides/guides/command-line) provides options for targeting browsers, configuring parallelization, and more.
