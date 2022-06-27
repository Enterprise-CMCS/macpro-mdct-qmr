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

EUA access requests may take days or weeks to process, but local development setup can continue.

## Local Development Setup

The following are pre-requesites for local development.

1. Install [Node](https://nodejs.org/en/download/)
1. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#installing-and-updating)
   - A specific version of Node is enforced and specified in the file `.nvmrc`. This version matches the Lambda runtime.
1. Install [Yarn](https://classic.yarnpkg.com)
   ```
   npm install --global yarn
   ```
1. Install [Serverless](https://www.serverless.com/framework/docs/getting-started)
   ```
   yarn global add serverless
   yarn upgrade serverless
   ```
1. Install the following Serverless plugins

   ```
   yarn add serverless-offline
   yarn add serverless-dynamodb-local
   yarn add serverless-s3-local

   # or install simultaneously
   yarn add serverless-offline && yarn add serverless-dynamodb-local && yarn add serverless-s3-local
   ```

1. Install all other node packages.
   ```
   yarn install  # can be skipped, will run automatically in dev script
   ```
1. Run the application.
   ```
   ./dev local
   ```

### Prettier

This repo uses the code formatter [Prettier](https://prettier.io/docs/en/index.html).

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

# Year End Transition Documenation

# Debugging Problems and Solutions
