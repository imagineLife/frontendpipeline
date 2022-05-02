# A Pipeline for a Frontend Repo

  - [Pre-Reqs](#pre-reqs)
    - [React](#react)
    - [Testing](#testing)
    - [Building into static assets](#building-into-static-assets)
  - [Using Surge](#using-surge)
  - [Using Prettier](#using-prettier)
  - [The Github Folder](#the-github-folder)
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


## The Github Folder
At the root of the directory is a `.github` directory. Here lies the guts of the CI/CD pipeline.  

### codeowners
Github includes a [bunch of functionalities](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) in their `CODEOWNERS` file.  
