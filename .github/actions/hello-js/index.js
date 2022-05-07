// Dependencies
const core = require("@actions/core");
const gh = require("@actions/github");

try {
  throw new Error("testing hard-coded error here");
  // prep
  const you = core.getInput("greet-me");
  const t = new Date();

  // do
  console.log(`Hello ${you}`);
  core.setOutput("time", t.toTimeString());
  console.log(JSON.stringify(gh, null, "\t"));
} catch (e) {
  core.setFailed(e.message);
}
