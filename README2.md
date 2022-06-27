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

If you haven't already, you need to first create an EUA user ID by visiting this site: https://eua.cms.gov/iam/im/pri/

## Eua

EUA is the first step to getting started with the application. Access to everything else starts here and can take days to weeks to process so it's best to request access as early as possible.

### List of EUA access codes needed for QMR and MacPRO projects in general

## IDM

## Github

## AWS

### security hub

### Installing AWS Command Line Locally

### where aws resources can be found

### how to request access to these environments

## how to set up dev

### required package

### nvm

### node version and .nvmrc file

### serverless

### use yarn

### how to install packages

### What needs to be in the local ENV table

### how to start

## prettier

### How to set it up on VS code to work on save

# testing

## Update Node modules

## Generate ENV with AWS Credentials

## runners used

## assertion libs used

## how to run tests

### Cypress

### Unit

#### How to see code coverage

## codeclimate

### location

### config

#### How to add new files to be included in the config

## table name env vars

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

### Adding new users to cognito

### How IDM users are synced to cognito

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

# Year End Transition Documenation

Go into the services/ui-src/src/measures directory and one should see past years as
folders (2021,2022,etc.). Ideally changes to measures would be made from the previous
year to the next so one would make a copy the folder of the most recent year and rename
it to the next year (2021->2022 for example). Then go into the folder and make any additions or removals of measures as needed per requirements.

Once the directory for the new year has been made there are a couple of changes one needs
to make in order to get that year working.

1. Go into the index.tsx file for the directory you just created
   (services/ui-src/src/measures/2022/index.tsx) and update the name of the export
   (twentyTwentyOneMeasures -> twentyTwentyTwoMeasures)

2. Go to the services/ui-src/src/measures/index.tsx file and add that new export
   (before and after shown below)

   Before

   ![Before](./.images/beforeCode.png?raw=true)

   After

   ![After](./.images/afterCode.png?raw=true)

3. Go to the services/app-api/handlers/dynamoUtils/measureList.ts and copy the array of
   measures from the previous year and copy them into the new year. Make any additions or
   removals of measures as needed per requirements.

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
