<!--
Render Markdown in VS Code

SHIFT + CMD/CTRL + V
-->

# Quality Measure Reporting (QMR)

# cms-mdct-qmr ![Build](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=master) [![latest release](https://img.shields.io/github/release/cmsgov/cms-mdct-qmr.svg)](https://github.com/cmsgov/cms-mdct-qmr/releases/latest) [![Maintainability](https://api.codeclimate.com/v1/badges/1449ad929006f559756b/maintainability)](https://codeclimate.com/github/CMSgov/cms-mdct-qmr/maintainability) [![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Test Coverage](https://api.codeclimate.com/v1/badges/f5b10ae50ca1effedcd3/test_coverage)](https://codeclimate.com/repos/60fae00673444f5bad001bf9/test_coverage)

## Release

Our product is promoted through branches. Master is merged to val to affect a master release, and val is merged to production to affect a production release. Please use the buttons below to promote/release code to higher environments.<br />

| branch     | status                                                                                       | release                                                                                                                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| master     | ![master](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=master)   | [![release to master](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare?quick_pull=1)                                                                                       |
| val        | ![val](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=val)         | [![release to val](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare/val...master?quick_pull=1&template=PULL_REQUEST_TEMPLATE.val.md&title=Release%20to%20Val)              |
| production | ![production](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=prod) | [![release to production](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare/prod...val?quick_pull=1&template=PULL_REQUEST_TEMPLATE.production.md&title=Release%20to%20Prod) |

## High Level Overview of the application's purpose

The new Quality Measure Reporting (QMR) application will house all the state required measures for reporting on Adult, Child, and Health Home core sets. The new application is replacing the time intensive SDF files previously used for submission. Data collected within the QMR application will be sent to the CMS partner MPR for analytics and reporting via the CollabraLink owned BigMAC application.
This application measures the quality of care and programs offered by states related to their Adult, Child and Health Home offerings.

## Value

The new web-based QMR application will allow CMS to access data submitted by the states in real time and with more accuracy. QMR has also been designed with HCD best practices in mind and has incorporated conditional logic and validation to ensure moving through each measure provides a better user experience and ease in understanding of what is being asked.

## Quickstart

### link to the quickstart it was forked from

# Getting Started

## Register an EUA Account

In order to make changes against this repo and interact with associated services, you will need an EUA account with appropriate job codes. Create an EUA user ID here: [https://eua.cms.gov/iam/im/pri/](https://eua.cms.gov/iam/im/pri/).

EUA access requests may take days or weeks to process, but local development setup can continue. It is highly recommended you make your EUA requests before continuing.

Job codes needed may vary by contract and job role. Consult with your team for a complete list. The following are commonly required software development job codes.

| Job Code                  | Description                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SLACK_P_USER              | Gets you access to CMS Slack. Many of the manual processes are initiated through contacting a specific team through Slack, in addition to being a primary means of communication.                                        |
| Github_Editor             | Required for managing CMS GitHub repos. Your GitHub user will still need to be added to the CMS orgs and relevant repos through GitHub. In order to accept those invitations, you will be prompted to sign into CMS EUA. |
| CMS_CLOUD_ACCESS          | Allows you to sign into CMS AWS with your EUA credentials. You will still need to be added to your project's AWS environments. See [AWS section](#aws) of this document for more information.                            |
| JIRA_Users                | Access to issue tracking repository on [CMS Jira](jira.cms.gov).                                                                                                                                                         |
| ENT_AGILE_TOOLS           | For Contractors and other NON-CMS employee users access to the CMS Enterprise Agile Tools                                                                                                                                |
| AWS_Splunk_User           | User Level Access for AWS Splunk Application                                                                                                                                                                             |
| CTR_VPN_3ZWINMF_Exception | One of 2 codes required for VPN access. Has a 90 day auto-expire. Needed while getting approved for a PIV. See [VPN section](#vpn) for more information.                                                                 |
| CTR_VPN_PIV_3ZWINMF       | Contractor VPN_PIV access to 3-Zone URL's, Windows servers & Mainframes. See [VPN section](#vpn) for more information.                                                                                                   |
| CARTS_D_User              | CARTS-SCHIP Annual Report Template System Development Access                                                                                                                                                             |
| CARTS_P_User              | CARTS-SCHIP Annual Report Template System Production Access                                                                                                                                                              |
| CARTS_V_User              | The CHIP Annual Report Template System (SARTS) application tracks and reports                                                                                                                                            |
| CHIP_D_User               | CHIP-State Childrens Health Ins Prog Enrollmnt Data Sys Dev Access                                                                                                                                                       |
| CHIP_P_User               | CHIP-State Childrens Health Ins Prog Enrollmnt Data Sys Prod Access                                                                                                                                                      |
| CHIP_V_User               | The CHIP Enrollment Data System is the electronic media system for the states                                                                                                                                            |

## Local Development Setup

The following are prerequisites for local development.

1. Install [Node](https://nodejs.org/en/download/)
1. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#installing-and-updating)
   - A specific version of Node is enforced and specified in the file `.nvmrc`. This version matches the Lambda runtime.
1. Install the correct version of Node
   ```bash
   # nvm commands will default to Node version defined in .nvmrc
   nvm install
   nvm use
   ```
1. Install [Homebrew](https://brew.sh)
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
1. Install [Yarn](https://classic.yarnpkg.com)
   ```bash
   brew install yarn
   ```
1. Install [Serverless](https://www.serverless.com/framework/docs/getting-started)
   ```bash
   yarn global add serverless
   yarn upgrade serverless
   ```
1. Install the following Serverless plugins

   ```bash
   yarn add serverless-offline
   yarn add serverless-dynamodb-local
   yarn add serverless-s3-local

   # or install simultaneously
   yarn add serverless-offline && yarn add serverless-dynamodb-local && yarn add serverless-s3-local
   ```

1. Install all other node packages.
   ```bash
   yarn install  # can be skipped, will run automatically in dev script
   ```
1. Set up your local ENV. There is no protected information for the local env. The name should be `.env` and it will be at the top of the project:

   ```
   SKIP_PREFLIGHT_CHECK=true
   LOCAL_LOGIN=true
   MEASURE_TABLE_NAME=local-measures
   MEASURE_TABLE_ARN=local_nonsense_if_unset_we_search_CF_for
   coreSetTableName=local-coreSets
   measureTableName=local-measures
   CORESET_TABLE_ARN=local_nonsense_if_unset_we_search_CF_for
   DYNAMODB_URL=http://localhost:8000
   API_URL=http://localhost:3030/local
   S3_LOCAL_ENDPOINT=http://localhost:4569
   S3_ATTACHMENTS_BUCKET_NAME=local-uploads
   URL=http://localhost/3000
   SLS_INTERACTIVE_SETUP_ENABLE=1
   ```

1. Set up the UI-SRC ENV.

   1. Navigate to `/services/ui-src/`.
   1. Make a new file: `.env`
   1. Copy the contents of `.env_example` into `.env`
      1. If you want to connect to real resources for the branch you can tweak these values with the resource values found in AWS.

1. Run the application.
   ```bash
   ./dev local
   ```
   A number of test users are defined in `users.json`. See the [AWS section](#aws) for more specific instructions and test user passwords.

### Prettier

This repo uses the code formatter [Prettier](https://prettier.io/docs/en/index.html). The package is downloaded during `yarn install` and is run automatically in a pre-commit hook. Additionally, the Prettier formatter can be run on file save in many IDEs or run ad hoc from the command line.

#### Prettier with VS Code

The Prettier extension can be downloaded from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Once installed, open VS Code's Preferences. Search for "format on save". Clicking the checkbox should engage the Prettier formatter on file save.

VS Code is used almost ubiquitously across the current development team, but similar instructions are available for other IDEs.

#### Prettier CLI

Using this command, or a variant of it, will format all matching files in the codebase and write the changes. Prettier has complete [CLI documentation](https://prettier.io/docs/en/cli.html) on their website.

```bash
npx prettier --write . # format everything relative to the pwd
npx prettier --write "**/*.tsx" "**/*.ts" # format all TypeScript files
```

## IDM

Users can log into QMR's non-development environments using IDM.

> [CMS' Identity Management (IDM) system](https://www.cms.gov/Research-Statistics-Data-and-Systems/CMS-Information-Technology/EnterpriseIdentityManagement/EIDM-Overview) is an established, enterprise-wide, identity management solution. IDM is leveraged by CMS business applications across the agency. End users of all business applications that integrate with this solution can use a single set of user credentials to access any integrated application.

### Creating an IDM Account

1. Access QMR at https://mdctqmr.cms.gov and select "Register"
1. Select the New User Registration button on the IDM sign-in screen
1. Provide requested information on the following screens and accept terms of service.
1. Enter a user ID and password, select a security question, and submit.

### Initiate Role Request for QMR Access via IDM

1. Sign in to IDM at https://home.idm.cms.gov
1. Select the "Role Request" tile
1. Select "Medicaid Data Collection Tool (MDCT) Quality Measures Reporting (QMR)" from the "Select an Application" drop-down list
1. Select the appropriate user role
   - Note: An account can only be associated with one role. If you need to have multiple roles (Ex: state user and admin) you will need to create multiple accounts.
1. Watch for an email confirming your role request submission
1. View and agree to the terms of service. Click the "Next" button.
1. Complete the Remote Identity Proofing (RIDP) form. Click the "Next" button.
1. Answer the RIDP questions as applicable. Click "Verify".
1. Select the applicable role attributes via the drop-down lists. Then click "Review Request".
1. Enter a reason for the request in the provided text box. Click "Submit Role Request".

## Github

GitHub access can be granted by any Admin on the Repo, but you will need to request it first, either through Slack or through GitHub's interface.

## AWS

_You must have an EUA account and your request for the appropriate job codes must be approved before you will be able to access AWS. See [Register an EUA Account section](#register-an-eua-account) of this document for more information._

### Request Access to QMR AWS Environments

You must be manually added to the appropriate AWS environments by CMS personnel. That request can be made in Jira or Slack.

1. Have an existing team member add you to the CMS Slack channel `#macpro-devsecops-techsupport`
   - Not recommended alternative, but possibly effective action: yell loudly in another channel and see if a stranger will help you.
1. Make a post requesting the following:
   - application admin for Dev and val accounts
   - read-only for production
1. Someone from the DevSecOps team should give you a link to a Jira ticket, or may ask you to make the ticket.
1. Follow along with the status of the ticket and provide any additional information needed. Most likely you will be asked to comment on the ticket confirming you can access AWS resources and the work is complete.

### VPN

VPN access will be given in the process of requesting AWS access.

1. A ticket will be created with CMS to request VPN access be granted.
1. An email will be sent to the account associated with your EUA ID containing
   1. Login credentials for getting Multifactor Authentication and
   1. A temporary password
1. With this information you can set up MFA through your phone or email.
1. After you have MFA you can use whatever VPN Client you prefer to connect to the CMS VPN

VPN access is needed to login to Kion and access your list of AWS accounts. It is also needed to access the ticketing system SNOW.

### Installing AWS CLI

Information on installing the AWS CLI for your machine can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

### Kion

[Kion](https://cloudtamer.cms.gov/portal/project) is the application where one can reach the different AWS accounts that they have access to. It requires For the QMR application the relevant accounts are.

1. MDCT-QMR-DEV: The development account that contains all branch resources and the dev resources
1. MDCT-QMR-IMPL: The account that contains our val environment.
1. MDCT-QMR-PROD: The account that contains our production environment.

They can be found in the Projects tab of Kion.

### Setting up AWS Credentials locally

Once you have configured the AWS CLI on your personal machine, if you want to access a given account locally you will.

1. Navigate to Kion
1. Navigate to Projects
1. Click Cloud Access
1. Select the Account
1. Select role for credentials
1. Select Short term Access Keys
1. Click the first option
1. Paste the selected credentials into the development console being used.

Once this process is completed you will be able to access and deploy resources from the account and also do local deployments and destroys of serverless infrastructure.

### Security Hub

Security Hub is an AWS service that identifies security issues in an account and requests remediation within a certain time period.

| Threat Level | Remediation Period |
| ------------ | ------------------ |
| CRITICAL     | Within 14 days     |
| HIGH         | Within 30 days     |
| MEDIUM       | Within 90 days     |
| LOW          | Within 120 days    |

Critical and High threats will be posted as issues in the GitHub repository.

### Service Now (SNOW)

Any AWS issues that are outside the capability or access level of the team needs to either go through the Devsecops team or through a service desk ticket.

SNOW is the ticketing service used by CMS and new tickets can be created [here](https://jiraent.cms.gov/plugins/servlet/desk/portal/22). You will need to be on the VPN to access SNOW. The majority of tickets will be IAM related and the turnaround time is usually about 12-24 hours between the time of filing the ticket and the first response from a human. With that in mind it's good to set aside extra time for tickets that you know will touch on IAM or new Cloud Services.

# testing

## Update Node modules

## Generate ENV file with AWS Credentials

## runners used

## assertion libs used

## how to run tests

### Cypress

### Unit

#### How to see code coverage

## codeclimate

### location

### config

#### How to add new files to be included in the code climate config

# Deployment

The short version of the CICD Pipeline is `Pull Request → Github Actions → Cloudformation Stacks → Accessible Application`

All of the deployments start with new code on a branch. A branch environment is created and this is where automated and manual testing occurs. Once all of the checks have been passed on a branch, it is pulled into the Master branch where more testing is done and all functionality is verified. Then it is pushed to the Val Branch, where a selection of business users test the new functionality and provide a further round of feedback. Once this feedback has been addressed a final push to the Production branch is done where live users have access to the new features.

## Pull Requests

## GitHub Actions

Github Actions are defined in the `.github/workflows` folder.

1. `precommit/prettier`: This runs prettier checks on the application and fixes minor issues if found. Any major issues that can't be corrected by `prettier fix` makes this step fail, and thus the whole pipeline will fail

1. `codeclimate`: This checks several code metrics including test coverage of the PR vs the existing code. If test coverage decreases or if different criteria are violated, this step will fail and require remediation in the code climate application.

1. `Deploy`: First runs unit tests, if any fail the deploy fails. Then goes through each service and deploys the cloudformation stack for it. The actions can also be monitored in AWS in the Cloudformation application. The Stack name will be `branch-name-service-name`. That information can also be useful for debugging if your stack fails to deploy.

   At the end of the deploy step the cloudfront URL will be output in the logs. This is one of the ways to retrieve the url for testing on a branch.

1. `Deploy Support`: Deploys the connection between the Security Hub and GitHub to create new GitHub issues in the repo if any security violations are found.

1. `Automation Deploy`: Runs all of the automation tests.

Right now the automation step does not run on the Val or Prod branches due to security restrictions around test users altering real data.

### deployment process

## live env urls

### Dev

### Val

### Prod

## branch deployments

### how to name branches

### how to do pr

## Local Deploy

## Local Destroy

# Services

## Architecture

![Architecture Diagram](./.images/architecture.svg?raw=true)

## App API

### Overview

The API service contains all of the API calls for the application. It is deployed with serverless and depends on the database service to exist first. It can be updated independently from the rest of the application as long as the inital infrastructure for the application has been created. This is to help speed up local deployment and debugging of branch resources and not for updates of any of the higher environments.

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

`forceKafkaSync`: This can be manually triggered to force kafka to reflect the current state of the database.

### Utilities

`convertToDynamoExpressionVars`: Dynamo requires very specific variable naming conventions which are unwieldly to interact with so this util will take all of the arguments and converts them into a dynamo readable version.

A known issue with this utility is that right now it only `ands` arguments, so if you have a list or get query that needs to exclude characteristics, this utility will need to be updated

`createCompoundKey`: creates the dynamo key for the coreset or measure based on the passed in parameters.

`measureList`: A list of all of the measures and the type of coreset they belong to. This is used when a new coreset is created to create new measures for that coreset.

## Database

We are using DynamoDb for our database solution for QMR. When looking for the databases in AWS search for `branchName-tableName` to find the tables for your branch.

### Tables

`coresets`: Takes a compound key containing a unique combination of state, year, and coreset ID.

`measures`: Takes a compound key containing a unique combination of state, year, coreset ID, and Measure ID.

### How to set up Dynamo endpoint to view local Db

In order to run dynamodb locally you will need to have java installed on your system. If not currently installed go here: https://java.com/en/download/ to download the latest version.

If you want to a visual view of your dynamodb after the application is up and running you can install the dynamodb-admin tool from here: https://www.npmjs.com/package/dynamodb-admin

To run the dynamodb gui, run `DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin` in a new terminal window

From here you can view the tables and perform operations on the local tables.

### Stream Functions

The stream functions fire deltas when updates to its table happens. These changes are picked up in the API where these changes are communicated to the kafka streams for the application.

## UI

The UI Service creates the URL's associated with the application and the cloudfront logs that monitor traffic.
For Master, Val, and Prod these URL's end with `.gov` the branch URL's end with `.com`

### Dev/Impl/Prod endpoints

Dev: https://mdctqmrdev.cms.gov/

Val: https://mdctqmrval.cms.gov/

Prod: https://mdctqmr.cms.gov/

### Branch Endpoints

The Endpoints created by a branch are random and can be found in the output of the cloudformation stack for the UI, it can also be found as an output of the deploy step of our github actions.

## UI Auth

The UI Auth service creates and manages the Authentication of the UI.

User data is synced from IDM to Cognito to allow for login to the application and the IDM roles are used to determine what a user has access to in the UI.

### user pools / cognito

### Okta

Okta is the Federated Identity Provider being used to allow users to use their IDM credentials with our application.

### Automating Test User Creation

There is one lambda function in the UI-Auth Service, this is to create test users that can login to the branch environments, dev, and Val, for testing, but not production.

To add new users with new attributes, you can edit the `users.json`

## UI-SRC

### general stack details

#### typescript

#### react

### design system

#### guided by USWDS 2.0

#### chakra-ui

#### use chakra for all layout

#### component library

### use react-icons

### react-query

## Uploads

### Integrations with Mathematica

#### S3 buckets

#### Endpoints associated with integration

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
   (`twentyTwentyOneMeasures` -> `twentyTwentyTwoMeasures`)

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

5. Copy over the `/globalValidations`, `/CommonQuestions`, and `/Qualifiers` directories to the latest year

6. Similar to Step 4, update import names from the previous year to the most recent year

   Before

   ![Before](./.images/beforeCommonComponentUpdate.png?raw=true)

   After

   ![After](./.images/afterCommonComponentUpdate.png?raw=true)

## Things to Look Out For (Gotchas)

If you are creating a new shared component (e.g. files under `/globalValidations`) while editing the previous year's files, it is possible that merge conflicts will arise. Make sure these concurrent changes are not overwriting or removing necessary code.

# Debugging Problems and Solutions

# Contributing / To-Do

See current open [issues](https://github.com/mdial89f/quickstart-serverless/issues) or check out the [project board](https://github.com/mdial89f/quickstart-serverless/projects/1)

Please feel free to open new issues for defects or enhancements.

To contribute:

- Fork this repository
- Make changes in your fork
- Open a pull request targetting this repository

Pull requests are being accepted.

# License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE.md) for full details.

```text
As a work of the United States Government, this project is
in the public domain within the United States.

Additionally, we waive copyright and related rights in the
work worldwide through the CC0 1.0 Universal public domain dedication.
```
