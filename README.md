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

# Table of Contents

- [MDCT QMR (Quality Measure Reporting)](#mdct-qmr-quality-measure-reporting)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Local Development Setup](#local-development-setup)
    - [Oxfmt](#oxfmt)
      - [Oxfmt with VS Code](#oxfmt-with-vs-code)
      - [Oxfmt CLI](#oxfmt-cli)
- [Testing](#testing)
  - [Runners and Assertion Libraries](#runners-and-assertion-libraries)
  - [Update Node Modules](#update-node-modules)
  - [How to Run Tests](#how-to-run-tests)
    - [Cypress Setup](#cypress-setup)
    - [Running Cypress Tests](#running-cypress-tests)
    - [Running Unit Tests](#running-unit-tests)
      - [Snapshot Tests](#snapshot-tests)
      - [Code Coverage Report](#code-coverage-report)
      - [Code Coverage Targets](#code-coverage-targets)
- [Services](#services)
  - [Architecture Diagram](#architecture-diagram)
  - [CDK](#cdk)
    - [Configuration - AWS Secrets Manager](#configuration-aws-secrets-manager)
    - [Destroy Entire Branch from Local](#destroy-entire-branch-from-local)
  - [App API](#app-api)
    - [Overview](#overview)
    - [Parameters](#parameters)
    - [CoreSet](#coreset)
    - [Measures](#measures)
    - [Kafka](#kafka)
    - [Utilities](#utilities)
  - [Database](#database)
    - [Tables](#tables)
    - [How to set up Dynamo endpoint to view local Db](#how-to-set-up-dynamo-endpoint-to-view-local-db)
    - [Running database scripts](#running-database-scripts)
  - [UI](#ui)
    - [Dev/Impl/Prod endpoints](#devimplprod-endpoints)
    - [Branch Endpoints](#branch-endpoints)
  - [UI Auth](#ui-auth)
    - [Okta](#okta)
    - [Automating Test User Creation](#automating-test-user-creation)
  - [UI-SRC](#ui-src)
    - [General Stack Details](#general-stack-details)
    - [Component Library](#component-library)
  - [Uploads](#uploads)
    - [Integrations with Mathematica](#integrations-with-mathematica)
- [Year End Transition Documentation](#year-end-transition-documentation)
  - [Things to Look Out For (Gotchas)](#things-to-look-out-for-gotchas)
- [Quickstart](#quickstart)
- [Slack Webhooks](#slack-webhooks)
- [GitHub Actions Secret Management](#github-actions-secret-management)
- [License](#license)

# Getting Started

## Local Development Setup

### Running MDCT Workspace Setup

Team members are encouraged to set up all MDCT Products using the script located in the [MDCT Tools Repository](https://github.com/Enterprise-CMCS/macpro-mdct-tools). Please refer to the README for instructions on running the MDCT Workspace Setup. After running workspace setup, team members can refer to the [Running the project locally](#running-the-project-locally) section below to proceed with running the application.

The following are prerequisites for local development. **If you have run the MDCT Workspace setup script, please ignore this section; it is not needed.**

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
7. Install [Yarn](https://classic.yarnpkg.com)
   ```bash
   brew install yarn
   ```
8. Look up [here](deployment/local/README.md) for other things you'll need to install, though it will prompt you when your `./run local` if you're missing something.
9. Install the pre-commit hook to run oxfmt on staged files before every commit
   ```bash
   pre-commit install
   ```
10. Install all other node packages.

```bash
yarn install  # can be skipped, will run automatically in dev script
```

## Running the project locally

1. To run the project run the following command from the root of the directory

   ```
   ./run update-env
   ./run local
   ```

   Note: This will populate a .env file at the root of the directory as well as in the `/services/ui-src/` directory, by authenticating to 1Password and pulling in development secrets. Both of those .env files are gitignored.

If you do not have a 1Password account, you can run `./run local`; however, you will need to reach out to a team member for .env values and populate those by hand, both in the root of the repo and in `/services/ui-src`.

To login a number of test users are provisioned via the `users.json`. Look in the 1password secret named `qmr-secrets` for the test user password.

### oxfmt

This repo uses the code formatter [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html). The formatter is run automatically in a pre-commit hook. Additionally, oxfmt can be run on file save in many IDEs or run ad hoc from the command line.

#### oxfmt with VS Code

The oxc extension can be downloaded from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode).

Once installed, open VS Code's Preferences. Search for "Format on Save". Clicking the checkbox should engage the oxfmt formatter on file save.

VS Code is used almost ubiquitously across the current development team; generally speaking, these tools should also work for most other IDEs.

#### oxfmt CLI

Using this command, or a variant of it, will format all matching files in the codebase and write the changes. oxfmt has complete [CLI documentation](https://oxc.rs/docs/guide/usage/formatter.html) on their website.

```bash
npx yarn oxfmt
```

# Testing

## Runners and Assertion Libraries

The JavaScript unit testing framework being used is [Jest](https://jestjs.io/), and the React component testing library being used is the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

## Update Node Modules

First, make sure your `node_modules` are up to date:

1. Navigate to tests and run
   ```bash
   yarn install
   ```
2. Navigate to tests/cypress and run
   ```bash
   yarn install
   ```

## How to Run Tests

### Cypress Setup

Once your local environment is up and running, these steps need to be taken to set up `Cypress`:

```
cd tests/
yarn install
cd cypress/
yarn install
```

### Running Cypress Tests

To run the end-to-end (E2E) `Cypress` tests:

from the root of the directory

```
./run update-env
yarn test
```

**note:** this will ensure you are using the latest values from 1Password and update your .env files

The `Cypress` application will kick off, where you can find a list of all the available E2E tests.

To run an individual Child Measure test, you first need to create these measures by running the `create_delete_child.spec.ts` test.

Similarly, to run an individual Health Home Measure test, you first need to create these measures by running the `create_delete_healthhome.spec.ts` test.

### Running Unit Tests

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

#### Snapshot Tests

Many of commonly used components and common question components are tested with snapshot tests. [Jest's documentation](https://jestjs.io/docs/snapshot-testing) describes what snapshot testing is and how to interact with their tooling.

If a change is made that affects the way a component renders, and that component is covered by snapshot testing, the snapshot tests will fail. This is expected behavior. Output logs should highlight clearly the discrepancies between the rendered component and the stored snapshot. Assuming the changes are anticipated, the snapshot should be updated to match the component so tests will pass going forward. See the ["Updating Snapshots"](https://jestjs.io/docs/snapshot-testing#updating-snapshots) section of the Jest docs for specific instructions on overwriting the snapshots. Alternatively, the old snapshot file can be deleted and will be re-generated on the next run of the test.

#### Code Coverage Report

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

#### Code Coverage Targets

The project maintains a high standard for unit and integration test coverage, targeting 90% or higher across critical components. Recent efforts have focused on increasing coverage and improving test reliability.

# Services

## Architecture Diagram

![Architecture Diagram](./.images/architecture.svg?raw=true)

## CDK

This project is built as a series of micro-services using the [CDK](https://aws.amazon.com/cdk/). CDK allows you to write typescript that compiles into CloudFormation Templates.

> **Bootstrapping AWS Accounts:**
> For detailed instructions on bootstrapping AWS accounts with CDK (including custom templates and prerequisites), please see [deployment/README.md](deployment/README.md).

### Configuration AWS Secrets Manager

Look in `deployment/deployment-config.ts` and look at the `DeploymentConfigProperties` interface which should give you a sense of which values are being injected into the app. The values must either be in `qmr-default` secret or `qmr-STAGE` to be picked up. The secrets are json objects so they contain multiple values each.

No values should be specified in both secrets. Just don't do it. Ok if that did ever happen the stage value would supersede. But really I promise you don't need it.

### Destroy Entire Branch from Local

In some circumstances you may want to remove all resources of a given branch. Occasionally there will be orphaned infrastructure that was not destroyed when the branch was destroyed for one reason or another. The process for destroying the branch

1. set up local AWS credentials per the [running database scripts](#running-database-scripts) section
2. `brew install jq` Install jq (command-line JSON processor). This is necessary for the destroy script to run properly.
3. `./run destroy name_of_your_branch` Run destroy script. You will be prompted to re-enter the branch name once it has found all associated resources. (There shouldn't be any errors but if there are any. Re-running the script should fix it)

## App API

### Overview

The API service contains all of the API calls for the application. It is deployed with cdk and depends on the database service to exist first.

### Parameters

Parameters are passed in by the URL in this order `state/year/coreset` for coreset endpoints and `state/year/coreset/measure` for measures and are used to determine the unique id of the dynamo record.

The only endpoints that need a body is `update`

### CoreSet

`create`: Creates the identified coreset, and then creates all child measures corresponding to the Adult, Child, or Health Home coreset.

`delete`: Deletes the identified coreset, and then deletes all child measures to that coreset.

`get`: Returns the identified coreset.

`list`: Given with parameters: `state/year` to return all the coresets for a given state and year.

`update`: The body can contain `submitted` or `status` to change the status of the coreset

### Measures

`create`: Creates the identified coreset. Right now this is only fired directly from the application when a new custom Health Home Measure is created. Otherwise it is used by the create coreset endpoint.

`delete`: Deletes the identified coreset. Right now this is only fired directly from the application when a new custom Health Home Measure is created. Otherwise it is used by the delete coreset endpoint.

`get`: Returns the identified measure

`list`: Given with parameters: `state/year/coreset` to return all measures corresponding to a given coreset.

`update`: The body can contain `data`, `status`, `reporting`, `description`, `detailedDescription`

### Kafka

The Kafka Queues we link to are in the BigMac account and are currently not being used for any downstream purposes

`postKafkaData`: Fires when an update to the database happens and syncs kafka to reflect the current state of the database.

### Utilities

`createDynamoUpdateParams`: Dynamo requires very specific variable naming conventions which are unwieldy to interact with so this util will take all of the arguments and converts them into a dynamo readable version.

`measureList`: A list of all of the measures and the type of coreset they belong to. This is used when a new coreset is created to create new measures for that coreset.

## Database

We are using DynamoDB for our database solution for QMR. When looking for the databases in AWS search for `branchName-tableName` to find the tables for your branch.

### Tables

| Table Name | Description                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `banners`  | Stores a single banner with the ID `admin-banner-id` that an admin can set to show on the home page for state users.                                                                                                                  |
| `coreSet`  | Tracks the existence, status, and progress of core sets for each state and year. Each record has a compound key of `${stateAbbr}${year}`                                                                                              |
| `measure`  | Primary storage for all individual measure records, capturing both metadata and user-supplied data for each measure within a state, year, and core set context. Each record has a compound key of `${stateAbbr}${year}${coreSetAbbr}` |
| `rate`     | Record of calculated, cross-program rates for each measure, state, year, and core set. Each record has a compound key of `${stateAbbr}${year}${coreSetAbbr}`                                                                          |

> Note that [HCBS](https://github.com/Enterprise-CMCS/macpro-mdct-hcbs) recently expanded the banner functionality to enable multiple banners stored within the app; presumably, eventually this application will do the same.

### How to set up Dynamo endpoint to view local DB

In order to run DynamoDB locally, you will need to have Java installed on your system. If not currently installed, go [here](https://java.com/en/download/) to download the latest version.

If you want to a visual view of your DynamoDB after the application is up and running, you can install the `dynamodb-admin` tool from [here](https://www.npmjs.com/package/dynamodb-admin).

To run the DynamoDB GUI, run `DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin` in a new terminal window. From here, you can view the tables and perform operations on the local tables.

### Running database scripts

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

## UI

The UI Service creates the URLs associated with the application and the cloudfront logs that monitor traffic.
For Main, Val, and Production, these URLs end with `.gov`; the branch URLs end with `.com`

### Dev/Impl/Prod endpoints

| Environment | URL                                    |
| ----------- | -------------------------------------- |
| Local       | http://localhost:3000/                 |
| Branch      | Found in the output of the Deploy step |
| Master      | https://mdctqmrdev.cms.gov/            |
| Val         | https://mdctqmrval.cms.gov/            |
| Prod        | https://mdctqmr.cms.gov/               |

### Branch Endpoints

The Endpoints created by a branch are random and can be found in the output of the cloudformation stack for the UI, it can also be found as an output of the deploy step of our github actions.

## UI Auth

The UI Auth service creates and manages the Authentication of the UI.

User data is synced from IDM to Cognito to allow for login to the application and the IDM roles are used to determine what a user has access to in the UI.

### Okta

Okta is the Federated Identity Provider being used to allow users to use their IDM credentials with our application.

### Automating Test User Creation

There is one lambda function in the UI-Auth Service, this is to create test users that can login to the branch environments, dev, and Val, for testing, but not production.

To add new users with new attributes, you can edit the `users.json`

## UI-SRC

The ui-src service contains all of our frontend code and is therefore the largest service in the project. Our project uses the React Web Framework, Typescript, Chakra-UI for components, react-icons for various icons in the application, and react-query

### General Stack Details

| Technology  | Use                                                            | Reason                                                                                                                                                                                                                                                             |
| ----------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| React       | Library for writing UI Components and Application Organization | We went with React because the majority of the team was comfortable with it, and the quickstart from which this application was forked came with a good React Skeleton                                                                                             |
| TypeScript  | Maintaining and enforcing types throughout the application     | JavaScript does not throw compile-time errors for types, which can lead to extremely difficult debugging. It also helps enforce code quality. TypeScript's plugins with IDEs also make local development faster and easier by auto filling pieces for known types. |
| Chakra_UI   | Rendering UI components and page Layout                        | We went with Chakra over material because we did a test. We chose one simple component and created it first with Material and then with Chakra. We found that chakra was far easier to develop with so we went with chakra                                         |
| React-Icons | Simple Icons throughout the application                        | It was free, easy to use, and had all of the icons we needed                                                                                                                                                                                                       |
| React-Query | State management                                               | It was the more lightweight option and was simpler to plug into the application compared to its competitors                                                                                                                                                        |

### Component Library

At its core, QMR consists of several small, simple components in `/services/ui-src/src/components`

These are then used to create more complex components in `/services/ui-src/src/measures/year/CommonQuestions`

These complex components are then used along with some of the simple components to create the forms for the application in `/services/ui-src/src/measures/year`

When creating a new form, it's best to find an existing form that closely matches your requirements, then modify it with complex components if necessary, or create a new complex component and modify it with simple components if needed, etc.

## Uploads

The Uploads service consists of a few S3 buckets and some integration functions. It is the only point where the downstream applications owned by Mathematica interact with our application. This is in two buckets.

1. Uploads: This is where attachment files are stored
2. DynamoSnapshotBucket: This is where snapshots of our dynamo database are stored as JSON objects for Mathematica to download.

Any uploads are first stored in an inaccessible folder until they are scanned by the anti-virus scanner. Antivirus definitions are updated daily. This is to prevent anyone from uploading malicious files.

### Integrations with Mathematica

The IAM roles that we receive from Mathematica are stored as SSM parameters and can be accessed and changed in the corresponding AWS account.

# Year End Transition Documentation

Go into the `services/ui-src/src/measures` directory and one should see past years as
folders (2021, 2022, etc.). Ideally, changes to measures would be made from the previous
year to the next so one would make a copy the folder of the most recent year and rename
it to the next year (e.g. 2021 -> 2022). Then go into the folder and make any additions
or removals of measures as needed per requirements.

Once the directory for the new year has been made there are a couple of changes one needs
to make in order to get that year working.

1. Go into the `index.tsx` file for the directory you just created
   (`services/ui-src/src/measures/2022/index.tsx`) and update the name of the export
   (`twentyTwentyOneMeasures` -> `twentyTwentyTwoMeasures`) and change the import year for `import { Data } from "labels/{year}/qualifierFormsData"` to the next year;

2. Go to the `services/ui-src/src/measures/index.tsx` file and add that new export
   (before and after shown below)

   Before

   ![Before](./.images/beforeCode.png?raw=true)

   After

   ![After](./.images/afterCode.png?raw=true)

3. Go to the `services/app-api/handlers/dynamoUtils/measureList.ts` and copy the array of
   measures from the previous year and copy them into the new year. Make any additions or
   removals of measures as needed per requirements.

4. Update any import names from the past year to the latest year (e.g. 2021 -> 2022)

   Before

   ![Before](./.images/beforeImportUpdate.png?raw=true)

   After

   ![After](./.images/afterImportUpdate.png?raw=true)

5. Similar to Step 4, update import names from the previous year to the most recent year

   Before

   ![Before](./.images/beforeCommonComponentUpdate.png?raw=true)

   After

   ![After](./.images/afterCommonComponentUpdate.png?raw=true)

6. In `services/ui-src/src/libs/spaLib.ts`, copy over the prior year's entry into the array.

7. In `services/ui-src/src/measures/measureDescriptions.ts` , copy over the prior year's entry into the array.

8. In `src/labels` copy the past year’s folder to the latest year (e.g. 2021 -> 2022)

9. Go to the `src/labels/QualifierFormsDatas.tsx` and add the newly created files from `src/labels/{year}/qualifierFormsData` as an import

10. Go to the `src/labels/Labels.tsx` and add the newly created files from `src/labels/{year}/commonQuestionsLabel` as an import

11. Go to the `src/labels/RateLabelTexts.tsx` and add the newly created files from `src/labels/{year}/rateLabelText` as an import

12. In `services/app-api/libs/coreSetByYearPreloaded.ts` , copy over the prior year's entry into the array.

13. In `services/app-api/libs/coreSetStatesList.ts` , copy over the prior year's entry into the array.

14. In `services/ui-src/src/config.ts` change `currentReportingYear` to the new reporting year.

### Cypress

1. In `test/cypress/support/constants.ts` change the value of `testingYear` to the new reporting year.

### LaunchDarkly Flag

1. In `services/ui-src/src/views/StateHome/index.tsx` look for the a line of code similar to this `const releaseYearByFlag = useFlags()?.["release2026"];` change the year to the latest year and do a quick search and replace with the new variable name.

## Things to Look Out For (Gotchas)

If you are creating a new shared component (e.g. files under `/globalValidations`) while editing the previous year's files, it is possible that merge conflicts will arise. Make sure these concurrent changes are not overwriting or removing necessary code.

# Quickstart

This application was forked from the [Quickstart Repository](https://github.com/Enterprise-CMCS/macpro-quickstart-serverless) and efforts are made to feedback any applicable changes to that repository from this one and vice versa.

## Slack Webhooks

This repository uses 3 webhooks to publish to 3 different channels all in CMS Slack.

- SLACK_WEBHOOK: This publishes to the `macpro-mdct-qmr-alerts` channel. Alerts published there are for deploy or test failures to the `main`, `val`, or `production` branches.

- INTEGRATIONS_SLACK_WEBHOOK: This is used to publish new pull requests to the `mdct-integrations-channel`

- PROD_RELEASE_SLACK_WEBHOOK: This is used to publish to the `mdct-prod-releases` channel upon successful release of QMR to production.
  - Webhooks are created by CMS tickets, populated into GitHub Secrets

## GitHub Actions Secret Management

- Secrets are added to GitHub secrets by GitHub Admins
- Development secrets are maintained in a 1Password vault

# License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE.md) for full details.

```text
As a work of the United States Government, this project is
in the public domain within the United States.

Additionally, we waive copyright and related rights in the
work worldwide through the CC0 1.0 Universal public domain dedication.
```
