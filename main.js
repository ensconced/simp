#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const getConfig = require("./get-config");

function main() {
  const config = getConfig();
  yargs(hideBin(process.argv))
    // put the config on its own property instead of merging in right with the cli args
    .config({ config })
    .parserConfiguration({
      "parse-positional-numbers": false,
    })
    .command(require("./build-command"))
    .command(require("./default-command"))
    .usage("TODO - write usage message").argv;
}

main();
