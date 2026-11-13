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

## Test Users
This is a breakdown of the users provisioned in preprod envs for the purpose of testing
- Test users are configured in `/services/ui-auth/libs/users.json`

### Non-State Users
These are users that are not tied to a specific State

- adminuser@test.com
- internaluser@test.com
- helpdesk@test.com
- approver@test.com

### State Users
These are users associated with a specific State and related CoreSet configuration
- CoreSet abbreviations can be found in `/services/app-api/types.ts`

#### Combined CoreSets
##### ACS and CCS
- OH.StateUser.Auto@test.com
- SC.StateUser.Auto@test.com

##### ACS, CCS, and HHCS
- NC.StateUser.Auto@test.com

#### Separate CoreSets
##### ACSC, ACSM, CCSC, and CCSM
- TX.StateUser.Auto@test.com
- UT.StateUser.Auto@test.com

##### ACSC, ACSM, CCSC, CCSM and one HHCS
- CT.StateUser.Auto@test.com
- TN.StateUser.Auto@test.com 

##### ACSC, ACSM, CCSC, CCSM and two HHCS
- WI.StateUser.Auto@test.com
- WV.StateUser.Auto@test.com
