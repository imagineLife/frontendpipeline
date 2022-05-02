# A Pipeline for a Frontend Repo
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
