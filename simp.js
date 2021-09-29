#!/usr/bin/env node

/*

"simp"

A very basic and opinionated utility for building C source files with all
dependencies derived from their included header files.

Usage:

simp ./path/to/some/source/file.c

This will output an executable to ./path/to/some/source/file

TODO
- consume config file to set up aliases for different build targets
- allow different "modes" - for using different compiler flags etc
- make-style change detection
- incremental builds - i.e. make object files and link in separate stage
- see what else I should steal from make

*/

const util = require("util");
const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

async function getHeaderDependencies(fileName) {
  const { stdout, stderr } = await exec(`clang -MM ${fileName}`);
  const lines = stdout.split(/\s/);
  return Promise.all(
    lines
      .filter((line) => line.endsWith(".h"))
      .map((headerFile) => fs.promises.realpath(headerFile))
  );
}

function findSourceSiblings(headerFiles) {
  const cFiles = headerFiles.map((headerFile) =>
    headerFile.replace(/\.h$/, ".c")
  );
  return cFiles.filter((cFile) => fs.existsSync(cFile));
}

async function addDependencies(fileName, sourceFiles) {
  sourceFiles.add(fileName);
  const headerDependencies = await getHeaderDependencies(fileName);
  const sourceDependencies = findSourceSiblings(headerDependencies);
  for (const dep of sourceDependencies) {
    if (!sourceFiles.has(dep)) {
      await addDependencies(dep, sourceFiles);
    }
  }
}

async function main() {
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
