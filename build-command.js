const buildFile = require("./build-file");

const command = "build <files..>";

const describe = "build a file";

const builder = {
  mode: {
    describe: "Which mode from the config to use",
  },
};

function handler(argv) {
  const { files } = argv;

  // TODO - currently we just use the first file...
  buildFile(files[0], argv);
}

module.exports = { command, describe, builder, handler };
