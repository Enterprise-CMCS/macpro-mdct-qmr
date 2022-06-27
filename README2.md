# Quality Measure Reporting (QMR)

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

`postKafkaData`: Fires when any of the coreset or measure endpoints is hit to update the corresponding kafka queue in the AWS BigMac account to reflect the delta from the API call

`forceKafkaSync`: This can be manually triggered to force kafka to reflect the current state of the database.

### Utilities

`convertToDynamoExpressionVars`: Dynamo requires very specific variable naming conventions which are unwieldly to interact with so this util will take all of the arguments and converts them into a dynamo readable version.

`createCompoundKey`: creates the dynamo key for the coreset or measure based on the passed in parameters.

`measureList`: A list of all of the measures and the type of coreset they belong to. This is used when a new coreset is created to create new measures for that coreset.

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

# Year End Transition Documenation

# Debugging Problems and Solutions
