const webpack = require("webpack");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./main.js",
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
};
