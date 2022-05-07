# A Pipeline for a Frontend Repo

[![Version Badge](https://img.shields.io/github/v/tag/imagineLife/frontendpipeline?logo=semantic-release)](https://github.com/imagineLife/frontendpipeline/releases)  
[![Code-Coverage Badge](https://img.shields.io/codecov/c/gh/imagineLife/frontend-pipeline?logo=codecov)](https://github.com/imagineLife/frontendpipeline/blob/master/src/App.test.js)  
[![Build Status](https://img.shields.io/github/workflow/status/imagineLife/frontendpipeline/All-In-One%20Pipeline?logo=github)](https://github.com/imagineLife/frontendpipeline/actions/workflows/all-in-one.yml)

- [A Pipeline for a Frontend Repo](#a-pipeline-for-a-frontend-repo)
  - [Pre-Reqs](#pre-reqs)
    - [React](#react)
    - [Testing](#testing)
    - [Building into static assets](#building-into-static-assets)
    - [Using Surge](#using-surge)
    - [Using Prettier](#using-prettier)
    - [Github Repo Deets](#github-repo-deets)
  - [The Github Folder](#the-github-folder)
    - [codeowners](#codeowners)
  - [Approach Choice](#approach-choice)
    - [Multiple Conditions in one Pipeline File](#multiple-conditions-in-one-pipeline-file)
    - [One job many steps](#one-job-many-steps)
    - [Some conditional steps](#some-conditional-steps)
  - [Stages](#stages)
  - [Steps](#steps)
    - [Gotchas](#gotchas)
  - [On Actions](#on-actions)
    - [A first HelloWorld type action](#a-first-helloworld-type-action)
    - [Compiling the code](#compiling-the-code)
    - [Logging and actions](#logging-and-actions)
      - [Masking a log value](#masking-a-log-value)
      - [Grouping logs into an expandable object](#grouping-logs-into-an-expandable-object)

## Pre-Reqs

### React

- this is a frontend SPA with react (not the focus here)

### Testing

- **frontend dev**: run frontend unit tests in dev mode here with `npm run test`
  - dev mode leaves test runner running, listening for file-changes in the terminal, ready to run tests over and over during development
- **frontend prod**: run frontend unit tests in prod mode here with `CI=true npm run test`
  - prod mode runs the tests 1x & exits the test runner process
- **frontend prod with coverage report**: run frontend unit tests in prod with a coverage report with `CI=true npm run test -- --coverage`

### Building into static assets

- here use `npm run build` to "build" the static assets to serve in a prod-like environment
  - this will create a directory if not present, called `build` that contains the contents ready for prod

### Using Surge

Here, Surge is used as a server to deploy the prod frontend assets to.  
Here, the surge cli should be installed on the host machine (_your laptop/desktop_). **If the surge cli is not installed on the host, install it**.

1. in the directory, after running build, run `surge`: Surge will start guessing at what to do
2. update the `project` string to include the build directory at the end - add `/build` to the end
3. use the rando-generated surge domain

### Using Prettier

Prettier has been setup in the repo, and the `package.json` file has 2 scripts that can be used:

- **format:check** runs prettier and logs the files that need formatting
- **format** will apply the formatting requirements outlined in the `.prettierrc` file

### Github Repo Deets

The repo has a bunch of branch settings

- master/main is protected
- PR is required to merge
  - approvals of PR are required
  - when new commits are pushed to a branch, reviewers need to review new pushed details - previous approvals do not persist

## The Github Folder

At the root of the directory is a `.github` directory. Here lies the guts of the CI/CD pipeline.

### codeowners

Github includes a [bunch of functionalities](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) in their `CODEOWNERS` file.

## Approach Choice

### Multiple Conditions in one Pipeline File

There is a all-in-one pipeline. This option has 1 stage & many steps. some of the steps are conditional based on the git workflow event being done (push, merge, etc).

### One job many steps

The all-in-one pipeline has one job, or stage.  
The all-in-one pipeline has many steps in that job/stage.

### Some conditional steps

Some steps are conditional and consider the github "event_name" values to "decide" whether or not to perform the step.

## Stages

- One Stage: `build`

## Steps

- `checkout the repo`: Checks out the repo so that the workflow can access the repo ([Github Action: Docs](https://github.com/actions/checkout#checkout-v3))
- `Cache node_mod dependencies`: For faster workflow ([Github Action: Docs](https://github.com/actions/cache#cache))
- `npm ci`: install node_mods - ran by the runner, no github action
- `lint` the repo with `npm run format:check` - ran through an npm script in the repo's `package.json`
- `frontend unit tests` - ran through an npm script in the repo's `package.json`
- `upload frontend code coverage artifacts` to github
- `Build Frontend assets` - ran by an npm script, storing frontend prod-ready assets into a "build" directory
- `upload Frontend assets ` to github
- `zip assets`: the build dir and the coverage dir
- `Create a Release` using [semantic-release](https://github.com/semantic-release/semantic-release)
- `Deploy to Staging` when ready
- `Deploy to Production` when ready

### Gotchas

- don't add a trailing slash `/` to the `repositoryUrl` field of the semantic-release config file `release.config.js` - it will break the ci/cd semantic-release functionality

## On Actions

Here, an action gets run by the same github runner that runs the rest of the workflow.  
Actions are one of two things:

- public
  - things like "checkout", "cache" and "setupNode" are all examples of actions in the "all-in-one" workflow, where the action is pulled from the github action repo. Github "knows" where to get this code from with the prefix set in the workflow file "actions/\*\*\*"
- private
  - we can make our own action, store the code locally & manage its functionality

### A first HelloWorld type action

A first-example of creating an action can be found in `.github/actions/hello-js`.

### Compiling the code

The action uses a few node modules.  
In order to NOT put the whole node_mods into the runner

- a node_mod `@vercel/ncc` is leveraged to "bundle" all the code
- the code can get packaged to NOT require the node_mods directory

### Logging and actions

Logs can be used in an action to give "debug" type output in the workflow cli output.  
In order to _see any logs_ from an action, a github env var must be set: set a secret `ACTIONS_SETP_DEBUG` to `true` and debug info will be printed from ALL actions used in a workflow.

the `@actions/core` module provides a buncha helpful fns to provide logs as an action developer. NOTE: the module :

```js
const core = require("@actions/core");

// DEBUG MESSAGES
core.debug("this will be a debug message");
core.warning("this will print in yellow");
core.error(
  "this will print in red: this will not stop the action from running nor will it trigger a failure"
);
```

#### Masking a log value

```js
// mask an input param
/*
  This will show the input val as **** instead of the string val
    when printing the val to the log
*/
const inputVal = core.getInput("the-input-param-key-here");
core.setSecret(inputVal);
core.debug(`inputVal received: ${inputVal}`);
```

#### Grouping logs into an expandable object

```js
core.startGroup("the group name here");
core.debug({
  a: "horse",
  b: "cat",
  c: "dog"
});
core.endGroup();
```
