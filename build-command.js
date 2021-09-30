const buildFile = require("./build-file");

const command = "build <files..>";

const describe = "build a file";

const builder = {
  mode: {
    describe: "Which mode from the config to use",
  },
};

function getMode(argv) {
  if (argv.mode) {
    const modes = argv.config.modes;
    if (modes[argv.mode]) {
      return modes[argv.mode];
    }
  }
  return undefined;
}

function handler(argv) {
  const { files } = argv;

  // TODO - currently we just use the first file...
  buildFile(files[0], getMode(argv));
}

module.exports = { command, describe, builder, handler };
