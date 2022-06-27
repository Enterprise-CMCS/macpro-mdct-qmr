<!--
Render Markdown in VS Code

SHIFT + CMD/CTRL + V
-->

# Quality Measure Reporting (QMR)

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
| CMS_CLOUD_ACCESS          | Allows you to sign into CMS AWS with your EUA credentials. You will still need to be added to your project's AWS environments. See [AWS section](#AWS) of this document for more information.                            |
| JIRA_Users                | Access to issue tracking repository on [CMS Jira](jira.cms.gov).                                                                                                                                                         |
| ENT_AGILE_TOOLS           | For Contractors and other NON-CMS employee users access to the CMS Enterprise Agile Tools                                                                                                                                |
| AWS_Splunk_User           | User Level Access for AWS Splunk Application                                                                                                                                                                             |
| CTR_VPN_3ZWINMF_Exception | One of 2 codes required for VPN access. Has a 90 day auto-expire. Needed while getting approved for a PIV. See [VPN section](#VPN) for more information.                                                                 |
| CTR_VPN_PIV_3ZWINMF       | Contractor VPN_PIV access to 3-Zone URL's, Windows servers & Mainframes. See [VPN section](#VPN) for more information.                                                                                                   |
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
1. Install the correct version of node
   ```bash
   cat .nvmrc  # print node version being used
   nvm install {node_version}
   nvm use  # will use version defined in .nvmrc
   ```
1. Install [Yarn](https://classic.yarnpkg.com)
   ```bash
   npm install --global yarn
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
1. Run the application.
   ```bash
   ./dev local
   ```
   A number of test users are defined in `users.json`. See the [AWS section](#AWS) for more specific instructions and test user passwords.

### Prettier

This repo uses the code formatter [Prettier](https://prettier.io/docs/en/index.html). The package is downloaded during `yarn install` and is run automatically in a pre-commit hook. Additionally, the Prettier formatter can be run on file save in many IDEs or run ad hoc from the command line.

#### VS Code

The Prettier extension can be downloaded from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Once installed, open VS Code's Preferences. Search for "format on save". Clicking the checkbox should engage the Prettier formatter on file save.

VS Code is used almost ubiquitously across the current development team, but similar instructions are available for other IDEs.

#### CLI

Using this command, or a variant of it, will format all matching files in the codebase and write the changes. Prettier has complete [CLI documentation](https://prettier.io/docs/en/cli.html) on their website.

```bash
npx prettier --write . # format everything relative to the pwd
npx prettier --write "**/*.tsx" "**/*.ts" # format all TypeScript files
```

## IDM

## Github

## AWS

### security hub

### Installing AWS Command Line Locally

### where aws resources can be found

### how to request access to these environments

## how to set up dev

### What needs to be in the local ENV table

## prettier

### How to set it up on VS code to work on save

# Deployment

## github actions

### Where they run, how to tell if they have failed

## master → val → prod

### deployment process

## live env urls

### Where the branch URL can be found (in the github build action)

### Dev

### Val

### Prod

## branch deployments

### how to name branches

### how to do pr

## authentication

### how user authentication is handled

### idm resource locations

### how to register/approve new user

### user pools / cognito

## testing

### Generate ENV with AWS Credentials

### runners used

### assertion libs used

### how to run tests

### codeclimate

#### location

#### config

### table name env vars

# Services

## App API

### rest api

### List of Endpoints, their associated operations and able to bring in

## Database

### dynamoDB

### details

### How to set up Dynamo endpoint to view local Db: copy from SEDS

## Stream Functions

### Kafka and what it's used for

## UI

## UI Auth

## ui src

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

# Debugging Problems and Solutions
