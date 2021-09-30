const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

function getArgs() {
  return yargs(hideBin(process.argv)).argv;
}

module.exports = getArgs;
