const util = require("util");
const exec = util.promisify(require("child_process").exec);

const command = "$0";

// Attempt to interpret subcommand as a script from the config file
async function handler(argv) {
  const { config, _ } = argv;
  const command = _[0];
  if (command && config.scripts) {
    const cmd = config.scripts[command];
    console.log(cmd);
    if (cmd) {
      const { stdout, stderr } = await exec(cmd);
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
    }
  }
}

module.exports = { command, handler };
