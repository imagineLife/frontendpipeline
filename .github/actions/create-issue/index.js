// dependencies
const core = require("@actions/core");
const gh = require("@actions/github");
async function run() {
  try {
    // capture inputs
    const GH_TOKEN = core.getInput("gh_token");
    const TITLE = core.getInput("title");
    const BODY = core.getInput("body");
    const ASSIGNEES = core.getInput("assignees");

    // setup new issue obj
    const NEW_ISSUE_OBJ = {
      // pass entire obj
      // includes owner
      // includes repo
      ...gh.context.repo,
      title: TITLE,
      body: BODY,
      assignees: ASSIGNEES ? ASSIGNEES.split("\n") : undefined
    };

    // do
    const oktokit = new gh.getOctokit(GH_TOKEN);
    const { data } = await oktokit.rest.issues.create(NEW_ISSUE_OBJ);

    // finish with some output
    core.setOutput("created-issue", JSON.stringify(data));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
