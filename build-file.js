const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const addDependencies = require("./add-dependencies");

function getFlagsForMode(mode, config) {
  const modeObject = config.modes[mode];
  if (modeObject) {
    if (modeObject.extends) {
      // TODO - infinite loop for extends cycles - don't do that!
      const superFlags = getFlagsForMode(modeObject.extends, config);
      const subFlags = modeObject.flags || "";
      return superFlags + " " + subFlags;
    }
    return modeObject.flags || "";
  }
  return "";
}

function getFlags(argv) {
  if (argv.config.modes) {
    if (argv.mode) {
      return getFlagsForMode(argv.mode, argv.config);
    } else if (argv.config.modes.default) {
      return getFlagsForMode("default", argv.config);
    }
  }
  return "";
}
// const mode = modes[argv.mode];
// if (argv.mode) {
//   const modes = argv.config.modes;
//   if (mode) {
//     const flags = mode.flags;
//     console.log(flags);
//   }
// }
// return "";

async function buildFile(file, argv) {
  const fileName = await fs.promises.realpath(file);
  const sourceFiles = new Set();
  await addDependencies(fileName, sourceFiles);
  const sourceFileArgs = [...sourceFiles].map((file) => `"${file}"`).join(" ");
  const outFile = fileName.replace(/\.c$/, "");
  const flags = getFlags(argv);
  const commandParts = ["clang", flags, sourceFileArgs, "-o", `"${outFile}"`];
  const command = commandParts.map((part) => part.trim()).join(" ");
  // TODO - proper logging
  console.log(command);
  const { stdout, stderr } = await exec(command);
  // TODO - stream output...
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
}

module.exports = buildFile;
