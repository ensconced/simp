const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const addDependencies = require("./add-dependencies");

async function buildFile(file, modeOptions) {
  const fileName = await fs.promises.realpath(file);
  const sourceFiles = new Set();
  await addDependencies(fileName, sourceFiles);
  const sourceFileArgs = [...sourceFiles].map((file) => `"${file}"`).join(" ");
  const outFile = fileName.replace(/\.c$/, "");
  const flags = (modeOptions && modeOptions.flags) || "";
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
