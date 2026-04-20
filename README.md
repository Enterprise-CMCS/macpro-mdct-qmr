# MDCT QMR (Quality Measure Reporting)

[![CodeQL](https://github.com/Enterprise-CMCS/macpro-mdct-qmr/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/Enterprise-CMCS/macpro-mdct-qmr/actions/workflows/codeql-analysis.yml)
[![Maintainability](https://qlty.sh/badges/6725809c-a572-4a88-b347-bd7610d5f5c4/maintainability.svg)](https://qlty.sh/gh/Enterprise-CMCS/projects/macpro-mdct-qmr)
[![Code Coverage](https://qlty.sh/badges/6725809c-a572-4a88-b347-bd7610d5f5c4/test_coverage.svg)](https://qlty.sh/gh/Enterprise-CMCS/projects/macpro-mdct-qmr)

### Integration Environment Deploy Status:

| Branch     | Build Status                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| main       | ![deploy](https://github.com/Enterprise-CMCS/macpro-mdct-qmr/actions/workflows/deploy.yml/badge.svg)                   |
| val        | ![deploy](https://github.com/Enterprise-CMCS/macpro-mdct-qmr/actions/workflows/deploy.yml/badge.svg?branch=val)        |
| production | ![deploy](https://github.com/Enterprise-CMCS/macpro-mdct-qmr/actions/workflows/deploy.yml/badge.svg?branch=production) |

QMR is the CMCS MDCT application for collecting state data related to measuring and quantifying healthcare processes and ensuring quality healthcare for Medicaid beneficiaries. The collected data assists CMCS in monitoring, managing, and better understanding Medicaid and CHIP programs.

## Table of Contents

- [Getting Started](#getting-started)
  - [One time only](#one-time-only)
  - [Running the project locally](#running-the-project-locally)
  - [oxfmt](#oxfmt)
- [Testing](#testing)
  - [Runners and Assertion Libraries](#runners-and-assertion-libraries)
  - [Update Node Modules](#update-node-modules)
  - [How to Run Tests](#how-to-run-tests)
- [Services](#services)
  - [Architecture Diagram](#architecture-diagram)
  - [CDK](#cdk)
  - [App API](#app-api)
  - [Database](#database)
  - [UI](#ui)
  - [UI Auth](#ui-auth)
  - [UI-SRC](#ui-src)
  - [Uploads](#uploads)
- [Year End Transition Documentation](#year-end-transition-documentation)
- [Quickstart](#quickstart)
- [Slack Webhooks](#slack-webhooks)
- [GitHub Actions Secret Management](#github-actions-secret-management)
- [License](#license)

## Getting Started

### Running MDCT Workspace Setup

Team members are encouraged to set up all MDCT Products using the script located in the [MDCT Tools Repository](https://github.com/Enterprise-CMCS/macpro-mdct-tools). Please refer to the README for instructions on running the MDCT Workspace Setup. After running workspace setup, team members can refer to the [Running the project locally](#running-the-project-locally) section below to proceed with running the application.

### One time only

**If you have run the MDCT Setup Script this section can be skipped**

1. [Create an SSH Key and link it to your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. Clone this repository locally
   ```bash
   git clone git@github.com:Enterprise-CMCS/macpro-mdct-qmr.git
   ```
3. Install [Node](https://nodejs.org/en/download/)
4. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#installing-and-updating)
   - A specific version of Node is enforced and specified in the `.nvmrc` file. This version matches the Lambda runtime.
5. Install the correct version of Node
   ```bash
   # nvm commands will default to Node version defined in .nvmrc
   nvm install
   nvm use
   ```
6. Install [Homebrew](https://brew.sh)
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
7. Enable **Corepack** (recommended) so the correct Yarn version is used.
   ```bash
   corepack enable
   ```
8. Look up [here](deployment/local/README.md) for other things you'll need to install, though it will prompt you when your `./run local` if you're missing something.
9. Install the pre-commit hook to run oxfmt on staged files before every commit
   ```bash
   brew install pre-commit # or pip install pre-commit
   pre-commit install
   ```
10. Install the 1Password CLI tool and authenticate to your 1Password account. This is necessary to pull in secrets for local development and testing.
    ```bash
    brew install 1password-cli
    op vault list
    ```
    If you do not have a 1Password account, you can still run the project locally, but you will need to reach out to a team member for `.env` values and populate those manually.
11. Install all other node packages.
    ```bash
    yarn install  # can be skipped; ./run runs yarn install automatically
    ```

### Running the project locally

To run the project, run the following commands from the root of the directory:

```bash
./run update-env
./run local
```

> [!NOTE]
> `./run update-env` populates a gitignored `.env` (from `.env.tpl`) by authenticating to 1Password and injecting values.
>
> `./run local` writes UI runtime config to `services/ui-src/public/env-config.js` based on CloudFormation outputs and then starts the Vite dev server.

To login, a number of test users are provisioned via `services/ui-auth/libs/users.json`. Check 1Password in the `qmr_secrets` section for the test user password.

#### oxfmt

This repo uses the code formatter [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html). The formatter is run automatically in a pre-commit hook. Additionally, oxfmt can be run on file save in many IDEs or run ad hoc from the command line.

##### oxfmt with VS Code

The oxc extension can be downloaded from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode).

Once installed, open VS Code's Preferences. Search for "Format on Save". Clicking the checkbox should engage the oxfmt formatter on file save.

VS Code is used almost ubiquitously across the current development team; generally speaking, these tools should also work for most other IDEs.

##### oxfmt CLI

Using this command, or a variant of it, will format all matching files in the codebase and write the changes. oxfmt has complete [CLI documentation](https://oxc.rs/docs/guide/usage/formatter.html) on their website.

```bash
npx yarn oxfmt
```

### Local development additional info

Local dev is configured as a TypeScript project. The entrypoint in `./cli/run.ts` manages running the moving pieces locally.

Local dev is built around the CDK setup which runs locally via LocalStack.

Local authorization uses Cognito from AWS (not LocalStack). `./run update-env` fetches values from 1Password and writes them into a gitignored `.env`.

See `deployment/local/README.md` for LocalStack-specific notes.

## Testing

### Runners and Assertion Libraries

The JavaScript unit testing framework being used is [Jest](https://jestjs.io/), and the React component testing library being used is the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

### Update Node Modules

This repo is a Yarn workspaces monorepo. Installing from the repo root installs dependencies for all workspaces.

```bash
yarn install
```

### How to Run Tests

#### Cypress Setup

Once your local environment is up and running, these steps need to be taken to set up `Cypress`:

```bash
yarn install
```

> [!NOTE]
> `./run local` already runs `yarn install` at the repo root; the command above is only needed if you are setting up Cypress without using `./run`.

#### Running Cypress Tests

To run the end-to-end (E2E) `Cypress` tests:

From the repo root:

```bash
./run update-env
yarn test
```

`yarn test` runs the Cypress workspace script (`yarn workspace cypress-tests test`). See `package.json` (root) and `tests/cypress/package.json`.

> [!NOTE]
> This will ensure you are using the latest values from 1Password and update your `.env` files.

The Cypress application will kick off, where you can find a list of all the available E2E tests.

To run an individual Child Measure test, you first need to create these measures by running the `create_delete_child.spec.ts` test.

Similarly, to run an individual Health Home Measure test, you first need to create these measures by running the `create_delete_healthhome.spec.ts` test.

See the [Cypress tests README](./tests/cypress/README.md) for more information.

#### Running Unit Tests

To run the `Jest` unit tests on the React components:

```
cd services/ui-src/
yarn test
```

To run the `Jest` unit tests on the API endpoints:

```
cd services/app-api/
yarn test
```

On the terminal, you will see the unit test results.

For example:

![Jest Results](./.images/jestResults.png?raw=true)

##### Snapshot Tests

Many of commonly used components and common question components are tested with snapshot tests. [Jest's documentation](https://jestjs.io/docs/snapshot-testing) describes what snapshot testing is and how to interact with their tooling.

If a change is made that affects the way a component renders, and that component is covered by snapshot testing, the snapshot tests will fail. This is expected behavior. Output logs should highlight clearly the discrepancies between the rendered component and the stored snapshot. Assuming the changes are intended, the snapshot should be updated to match the component so tests will pass going forward. See the ["Updating Snapshots"](https://jestjs.io/docs/snapshot-testing#updating-snapshots) section of the Jest docs for specific instructions on overwriting the snapshots. Alternatively, the old snapshot file can be deleted and will be re-generated on the next run of the test.

##### Code Coverage Report

To view a unit test code coverage report on the React components:

```
cd services/ui-src/
yarn test --coverage
```

To view a unit test code coverage report on the API endpoints:

```
cd services/app-api/
yarn test --coverage
```

On the terminal, there will be a detailed coverage report followed by a coverage summary similar to this one:

![Code Coverage Report](./.images/codeCoverageReport.png?raw=true)

##### Code Coverage Targets

The project maintains a high standard for unit and integration test coverage, targeting 90% or higher across critical components.

## Services

### Architecture Diagram

![Architecture Diagram](./.images/architecture.svg?raw=true)

### CDK

This project is built as a series of micro-services using the [CDK](https://aws.amazon.com/cdk/). CDK allows you to write typescript that compiles into CloudFormation Templates.

> **Bootstrapping AWS Accounts:**
> For detailed instructions on bootstrapping AWS accounts with CDK (including custom templates and prerequisites), please see [deployment/README.md](deployment/README.md).

#### Configuration AWS Secrets Manager

Look in `deployment/deployment-config.ts` and the `DeploymentConfigProperties` interface to see which values are injected into deployed stacks.

Deployment config is loaded from two AWS Secrets Manager secrets (JSON objects):

- `${PROJECT}-default`
- `${PROJECT}-${stage}` (optional; values override defaults when present)

`PROJECT` comes from environment variables and is set to `qmr` for local development (see `.env.tpl`).

If a key exists in both secrets, the stage secret wins.

#### Destroy Entire Branch from Local

In some circumstances you may want to remove all resources of a given branch. Occasionally there will be orphaned infrastructure that was not destroyed when the branch was destroyed for one reason or another. The process for destroying the branch

1. set up local AWS credentials per the [running database scripts](#running-database-scripts) section
2. `brew install jq` Install jq (command-line JSON processor). This is necessary for the destroy script to run properly.
3. `./run destroy name_of_your_branch` Run destroy script. You will be prompted to re-enter the branch name once it has found all associated resources. (There shouldn't be any errors but if there are any. Re-running the script should fix it)

### App API

#### Overview

The API service provides all backend endpoints for the application. It is deployed with CDK and depends on the database service.

#### Parameters

Parameters are passed in the URL in this order:

- For coreset endpoints: `state/year/coreset`
- For measure endpoints: `state/year/coreset/measure`

These are used to determine the unique ID of the DynamoDB record.

#### Endpoints

##### Banners

| Method   | Path                  | Description                             |
| -------- | --------------------- | --------------------------------------- |
| `POST`   | `/banners/{bannerId}` | Create a banner (requires request body) |
| `DELETE` | `/banners/{bannerId}` | Delete a banner                         |
| `GET`    | `/banners/{bannerId}` | Fetch a banner                          |

##### CoreSets

| Method   | Path                                       | Description                                                           |
| -------- | ------------------------------------------ | --------------------------------------------------------------------- |
| `GET`    | `/coreset/{state}/{year}/list`             | Get all coresets for a state and year                                 |
| `GET`    | `/coreset/{state}/{year}/{coreSet}/get`    | Get a specific coreset                                                |
| `POST`   | `/coreset/{state}/{year}/{coreSet}/create` | Create a coreset (requires request body; also creates child measures) |
| `PUT`    | `/coreset/{state}/{year}/{coreSet}/edit`   | Edit a coreset (body: `submitted` or `status`)                        |
| `DELETE` | `/coreset/{state}/{year}/{coreSet}/delete` | Delete a coreset and its child measures                               |

##### Measures

| Method   | Path                                                          | Description                                                |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| `GET`    | `/coreset/{state}/{year}/{coreSet}/measures/list`             | Get all measures for a coreset                             |
| `GET`    | `/coreset/{state}/{year}/{coreSet}/measures/{measure}/get`    | Get a specific measure                                     |
| `POST`   | `/coreset/{state}/{year}/{coreSet}/measures/{measure}/create` | Create a measure (requires request body)                   |
| `PUT`    | `/coreset/{state}/{year}/{coreSet}/measures/{measure}/edit`   | Edit a measure (body: `data`, `status`, `reporting`, etc.) |
| `DELETE` | `/coreset/{state}/{year}/{coreSet}/measures/{measure}/delete` | Delete a measure                                           |

##### Metadata & Utilities

| Method | Path                       | Description                   |
| ------ | -------------------------- | ----------------------------- |
| `GET`  | `/coreset/reportingyears`  | Get available reporting years |
| `GET`  | `/coreset/measureListInfo` | Get measure metadata          |

##### Rates

| Method | Path                                           | Description                      |
| ------ | ---------------------------------------------- | -------------------------------- |
| `GET`  | `/rate/{state}/{year}/{coreSet}/{measure}/get` | Get combined rates for a measure |

##### PDF Generation

| Method | Path                                       | Description                                          |
| ------ | ------------------------------------------ | ---------------------------------------------------- |
| `POST` | `/coreset/{state}/{year}/{coreSet}/getPDF` | Generate a PDF for a coreset (requires request body) |

#### Kafka

<!-- TODO: is this still true? -->

Kafka queues are linked to the BigMac account and are not currently used for downstream purposes.

- `postKafkaData`: DynamoDB-stream-driven Lambda that publishes change-data-capture (CDC) events to Kafka.
  - Topic prefix/version: `aws.mdct.qmr.cdc` + `v0`
  - Table→topic mappings (via env): `QualityCoreSetsTable` → `coreSet`, `MeasuresTable` → `measure`, `CombinedRatesTable` → `rate`

#### Utilities

- `createDynamoUpdateParams`: Utility to convert arguments into DynamoDB-compatible update parameters.
- `measureList`: Utility providing a list of all measures and their associated coreset types, used when creating new coresets and measures.

### Database

We are using DynamoDB for our database solution for QMR. When looking for the databases in AWS search for `branchName-tableName` to find the tables for your branch.

#### Tables

| Table Name | Description                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `banners`  | Stores a single banner with the ID `admin-banner-id` that an admin can set to show on the home page for state users.                                                                                                                  |
| `coreSet`  | Tracks the existence, status, and progress of core sets for each state and year. Each record has a compound key of `${stateAbbr}${year}`                                                                                              |
| `measure`  | Primary storage for all individual measure records, capturing both metadata and user-supplied data for each measure within a state, year, and core set context. Each record has a compound key of `${stateAbbr}${year}${coreSetAbbr}` |
| `rate`     | Record of calculated, cross-program rates for each measure, state, year, and core set. Each record has a compound key of `${stateAbbr}${year}${coreSetAbbr}`                                                                          |

> [!NOTE]
> [HCBS](https://github.com/Enterprise-CMCS/macpro-mdct-hcbs) recently expanded the banner functionality to enable multiple banners stored within the app; presumably, eventually this application will do the same.

#### How to set up Dynamo endpoint to view local DB

In order to run DynamoDB locally, you will need to have Java installed on your system. If not currently installed, go [here](https://java.com/en/download/) to download the latest version.

If you want a visual view of your DynamoDB after the application is up and running, you can install the `dynamodb-admin` tool from [here](https://www.npmjs.com/package/dynamodb-admin).

To run the DynamoDB GUI, run `DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin` in a new terminal window. From here, you can view the tables and perform operations on the local tables.

#### Running database scripts

There are a few scripts located within `services/database/scripts` that can be run to perform various operations on the database. In deployed environments, these can be run using environment variables that can be obtained from Kion for a given target environment.

In order to tell the AWS SDK to interact with the local database, you will need to set a these environment variables to point to your LocalStack instance instead:

```bash
export AWS_ACCESS_KEY_ID="test"
export AWS_SECRET_ACCESS_KEY="test" # pragma: allowlist secret
export AWS_DEFAULT_REGION="us-east-1"
export AWS_ENDPOINT_URL="http://localhost.localstack.cloud:4566"
```

Once your environment variables are set, ensure your LocalStack instance is running. You can then run a script with the following command:

```bash
npx ts-node services/database/scripts/scriptName.ts
```

Scripts in this directory can be used to perform a variety of operations, such as migrating data from one table to another or correcting data that has already been recorded.

### UI

The UI Service creates the URLs associated with the application and the cloudfront logs that monitor traffic.
For Main, Val, and Production, these URLs end with `.gov`; the branch URLs end with `.com`

#### Dev/Impl/Prod endpoints

| Environment | URL                                    |
| ----------- | -------------------------------------- |
| Local       | http://localhost:3000/                 |
| Branch      | Found in the output of the Deploy step |
| Master      | https://mdctqmrdev.cms.gov/            |
| Val         | https://mdctqmrval.cms.gov/            |
| Prod        | https://mdctqmr.cms.gov/               |

#### Branch Endpoints

The endpoints created by a branch can be found in CloudFormation stack outputs for the UI stack and in the output of the deploy step in GitHub Actions.

### UI Auth

The UI Auth service creates and manages the Authentication of the UI.

User data is synced from IDM to Cognito to allow for login to the application and the IDM roles are used to determine what a user has access to in the UI.

#### Okta

Okta is the Federated Identity Provider being used to allow users to use their IDM credentials with our application.

#### Automating Test User Creation

There is one lambda function in the UI-Auth Service, this is to create test users that can login to the branch environments, dev, and Val, for testing, but not production.

To add new users with new attributes, edit `services/ui-auth/libs/users.json`.

### UI-SRC

The ui-src service contains all of our frontend code and is therefore the largest service in the project. Our project uses the React Web Framework, Typescript, Chakra-UI for components, react-icons for various icons in the application, and react-query

#### General Stack Details

| Technology  | Use                                                            | Reason                                                                                                                                                                                                                                                             |
| ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React       | Library for writing UI Components and Application Organization | We went with React because the majority of the team was comfortable with it, and the quickstart from which this application was forked came with a good React Skeleton                                                                                             |
| TypeScript  | Maintaining and enforcing types throughout the application     | JavaScript does not throw compile-time errors for types, which can lead to extremely difficult debugging. It also helps enforce code quality. TypeScript's plugins with IDEs also make local development faster and easier by auto filling pieces for known types. |
| Chakra_UI   | Rendering UI components and page Layout                        | We went with Chakra over material because we did a test. We chose one simple component and created it first with Material and then with Chakra. We found that chakra was far easier to develop with so we went with chakra                                         |
| React-Icons | Simple Icons throughout the application                        | It was free, easy to use, and had all of the icons we needed                                                                                                                                                                                                       |
| React-Query | State management                                               | It was the more lightweight option and was simpler to plug into the application compared to its competitors                                                                                                                                                        |

#### Component Library

At its core, QMR consists of several small, simple components in `/services/ui-src/src/components`

These are then used to create more complex components in `/services/ui-src/src/measures/year/CommonQuestions`

These complex components are then used along with some of the simple components to create the forms for the application in `/services/ui-src/src/measures/year`

When creating a new form, it's best to find an existing form that closely matches your requirements, then modify it with complex components if necessary, or create a new complex component and modify it with simple components if needed, etc.

### Uploads

The Uploads service consists of a few S3 buckets and some integration functions. It is the only point where the downstream applications owned by Mathematica interact with our application. This is in two buckets.

1. Uploads: This is where attachment files are stored
2. DynamoSnapshotBucket: This is where snapshots of our dynamo database are stored as JSON objects for Mathematica to download.

Any uploads are first stored in an inaccessible folder until they are scanned by the anti-virus scanner. Antivirus definitions are updated daily. This is to prevent anyone from uploading malicious files.

#### Integrations with Mathematica

The IAM roles that we receive from Mathematica are stored as SSM parameters and can be accessed and changed in the corresponding AWS account.

## Year End Transition Documentation

For details on the year end transition process, please refer to the [Year End Transition](./YEAR_END_TRANSITION.md) documentation file.

## Quickstart

This application was forked from the [Quickstart Repository](https://github.com/Enterprise-CMCS/macpro-quickstart-serverless) and efforts are made to feedback any applicable changes to that repository from this one and vice versa.

### Slack Webhooks

This repository uses 3 webhooks to publish to 3 different channels all in CMS Slack.

- SLACK_WEBHOOK: This publishes to the `macpro-mdct-qmr-alerts` channel. Alerts published there are for deploy or test failures to the `main`, `val`, or `production` branches.

- INTEGRATIONS_SLACK_WEBHOOK: This is used to publish new pull requests to the `mdct-integrations-channel`

- PROD_RELEASE_SLACK_WEBHOOK: This is used to publish to the `mdct-prod-releases` channel upon successful release of QMR to production.
  - Webhooks are created by CMS tickets, populated into GitHub Secrets

### GitHub Actions Secret Management

- Secrets are added to GitHub secrets by GitHub Admins
- Development secrets are maintained in a 1Password vault

## License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE.md) for full details.

```text
As a work of the United States Government, this project is
in the public domain within the United States.

Additionally, we waive copyright and related rights in the
work worldwide through the CC0 1.0 Universal public domain dedication.
```
