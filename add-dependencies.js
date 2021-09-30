const util = require("util");
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

module.exports = addDependencies;
