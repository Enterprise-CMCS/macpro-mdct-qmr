# cms-mdct-qmr ![Build](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=master) [![latest release](https://img.shields.io/github/release/cmsgov/cms-mdct-qmr.svg)](https://github.com/cmsgov/cms-mdct-qmr/releases/latest) [![Maintainability](https://api.codeclimate.com/v1/badges/1449ad929006f559756b/maintainability)](https://codeclimate.com/github/CMSgov/cms-mdct-qmr/maintainability) [![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Test Coverage](https://api.codeclimate.com/v1/badges/f5b10ae50ca1effedcd3/test_coverage)](https://codeclimate.com/repos/60fae00673444f5bad001bf9/test_coverage)

A serverless form submission application built and deployed to AWS with the Serverless Application Framework.

## Release

Our product is promoted through branches. Master is merged to val to affect a master release, and val is merged to production to affect a production release. Please use the buttons below to promote/release code to higher environments.<br />

| branch     | status                                                                                       | release                                                                                                                                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| master     | ![master](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=master)   | [![release to master](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare?quick_pull=1)                                                                                       |
| val        | ![val](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=val)         | [![release to val](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare/val...master?quick_pull=1&template=PULL_REQUEST_TEMPLATE.val.md&title=Release%20to%20Val)              |
| production | ![production](https://github.com/CMSgov/cms-mdct-qmr/workflows/Deploy/badge.svg?branch=prod) | [![release to production](https://img.shields.io/badge/-Create%20PR-blue.svg)](https://github.com/CMSgov/cms-mdct-qmr/compare/prod...val?quick_pull=1&template=PULL_REQUEST_TEMPLATE.production.md&title=Release%20to%20Prod) |

## Architecture

![Architecture Diagram](./.images/architecture.svg?raw=true)

## Local Dev

Run all the services locally with the command `./dev local`

See the Requirements section if the command asks for any prerequisites you don't have installed.

Local dev is configured in typescript project in `./src`. The entrypoint is `./src/dev.ts`, it manages running the moving pieces locally: the API, the database, the filestore, and the frontend.

Local dev is built around the Serverless plugin [`serverless-offline`](https://github.com/dherault/serverless-offline). `serverless-offline` runs an API gateway locally configured by `./services/app-api/serverless.yml` and hot reloads your lambdas on every save. The plugins [`serverless-dynamodb-local`](https://github.com/99x/serverless-dynamodb-local) and [`serverless-s3-local`](https://github.com/ar90n/serverless-s3-local) stand up the local db and local s3 in a similar fashion.

When run locally, auth bypasses Cognito. The frontend mimics login in local storage with a mock user and sends an id in the `cognito-identity-id` header on every request. `serverless-offline` expects that and sets it as the cognitoId in the requestContext for your lambdas, just like Cognito would in AWS.

### Prettier Linter

We use Prettier to format all code. This runs as part of a Git Hook and changes to files will cause the deploy to fail.

Most IDEs have a Prettier plugin that can be configured to run on file save. You can also run the format check manually from the IDE or invoking Prettier on the command line.

```
npx prettier --write "**/*.tsx"
```

## Usage

See master build [here](https://github.com/CMSgov/cms-mdct-qmr/actions?query=branch%3Amaster)

This application is built and deployed via GitHub Actions.

Want to deploy from your Mac?

- Create an AWS account
- Install/configure the AWS CLI
- npm install -g severless
- brew install yarn
- sh deploy.sh

Building the app locally

- todo

Running tests locally

- npm test

## Requirements

Node - we enforce using a specific version of node, specified in the file `.nvmrc`. This version matches the Lambda runtime. We recommend managing node versions using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

Serverless - Get help installing it here: [Serverless Getting Started page](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)

Yarn - in order to install dependencies, you need to [install yarn](https://classic.yarnpkg.com/en/docs/install/).

AWS Account: You'll need an AWS account with appropriate IAM permissions (admin recommended) to deploy this app in Amazon.

If you are on a Mac, you should be able to install all the dependencies like so:

```
# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# select the version specified in .nvmrc
nvm install
nvm use

# install yarn
brew install yarn

# run dev
./dev local
```

## DynamoDB locally

In order to run dynamodb locally you will need to have java installed on your system. If not currently installed go here: https://java.com/en/download/ to download the latest version.

If you want to a visual view of your dynamodb after the application is up and running you can install the dynamodb-admin tool from here: https://www.npmjs.com/package/dynamodb-admin

- to run the dynamodb gui, run `DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin` in a new terminal window

## Testing

### ui-src Unit Tests

```
cd services/ui-src/
yarn test

# live reload all tests
yarn test --watch

# specify test to run
npx jest src/components --watch  # run all component tests and watch for changes
```

### Cypress Testing

[See here](./tests/cypress/README.md)

## Create New Branches and PRs for Tests

When writing Cypress tests for an existing branch, create a new branch and write the tests there. For example, if the branch that needs tests is called `oy2-1234`, create a new branch called `oy2-1234test`.

When the tests have been written, create a new PR for `oy2-1234test` and set its base to `oy2-1234`. Submit this PR for review.

## Dependencies

In order to hide the crendentials of test users a shell script has been added to the tests/cypress directory which is used to generate a test-config.js file used to login with the test users. It is run in the following manner:

(Add your AWS Access tokens)
(Run this in the tests/cypress directory)

sh configureLocal.sh your-branch-name

Once it is done runnning you should see a test-config.js file in your tests/cypress directory and now the tests will be able to properly access the right credentials.

## Examples

None.

## Contributing / To-Do

See current open [issues](https://github.com/mdial89f/quickstart-serverless/issues) or check out the [project board](https://github.com/mdial89f/quickstart-serverless/projects/1)

Please feel free to open new issues for defects or enhancements.

To contribute:

- Fork this repository
- Make changes in your fork
- Open a pull request targetting this repository

Pull requests are being accepted.

## License

[![License](https://img.shields.io/badge/License-CC0--1.0--Universal-blue.svg)](https://creativecommons.org/publicdomain/zero/1.0/legalcode)

See [LICENSE](LICENSE.md) for full details.

```text
As a work of the United States Government, this project is
in the public domain within the United States.

Additionally, we waive copyright and related rights in the
work worldwide through the CC0 1.0 Universal public domain dedication.
```

## Slack channel

To enable slack integration, set a value for SLACK_WEBHOOK_URL in github actions secret.

To set the SLACK_WEBHOOK_URL:

- Go to https://api.slack.com/apps
- Create new app : fill in the information
- Add features and funtionality----Incoming webhooks--- activative incoming webooks--- Add new webhook to workspace.
- copy new webhook url and set it as SLACK_WEBHOOK_URL in github actions secret.

Please join the cms-mdct-qmr slack channel to get all build status and also contribute to any ongoing discussions.
Join here: https://join.slack.com/t/macproquickst-ugp3045/shared_invite/zt-mdxpbtkk-SrLRi_yzJrXX3uYgvrbjlg

### Contributors

This project made possible by the [Serverless Stack](https://serverless-stack.com/) and its authors/contributors. The extremely detailed tutorial, code examples, and serverless pattern is where this project started. I can't recommend this resource enough.

| [![Mike Dial][dial_avatar]][dial_homepage]<br/>[Mike Dial][dial_homepage] | [![Seth Sacher][sacher_avatar]][sacher_homepage]<br/>[Seth Sacher][sacher_homepage] |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |

[dial_homepage]: https://github.com/mdial89f
[dial_avatar]: https://avatars.githubusercontent.com/mdial89f?size=150
[sacher_homepage]: https://github.com/sethsacher
[sacher_avatar]: https://avatars.githubusercontent.com/sethsacher?size=150
