const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

function findConfig() {
  function findConfigInDirectory(dir) {
    // TODO - allow different config names via cli option?
    const filePath = path.resolve(dir, "./simp.config.jsonc");
    return fs.existsSync(filePath) ? filePath : false;
  }

  let currentDir = process.cwd();
  let nextDir;
  while (true) {
    const config = findConfigInDirectory(currentDir);
    if (config) return config;
    nextDir = path.resolve(currentDir, "../");
    if (nextDir === currentDir) return false;
    currentDir = nextDir;
  }
}

function getConfig() {
  // TODO - apply defaults to config
  const configPath = findConfig();
  // TODO - check for parse warnings/errors - see docs for jsonc-parser
  return configPath ? parse(fs.readFileSync(configPath, "utf-8")) : {};
}

module.exports = getConfig;
