const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

const output_dir = path.resolve(__dirname, "build");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: output_dir,
    filename: "webpack.bundle.js",
  },
});
