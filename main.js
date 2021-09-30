#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getArgs = require("./get-args");
const config = require("./get-config");
const getConfig = require("./get-config");
const addDependencies = require("./add-dependencies");

async function main() {
  const args = getArgs();
  const config = getConfig();

  const fileName = await fs.promises.realpath(process.argv[2]);
  const sourceFiles = new Set();
  await addDependencies(fileName, sourceFiles);
  const sourceFileArgs = [...sourceFiles].map((file) => `"${file}"`).join(" ");
  const outFile = fileName.replace(/\.c$/, "");
  const { stdout, stderr } = await exec(
    `clang ${sourceFileArgs} -o "${outFile}"`
  );
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
}

main();
