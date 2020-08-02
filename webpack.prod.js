const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const common = require("./webpack.common.js");

const output_dir = path.resolve(__dirname, "dist");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: output_dir,
    filename: "webpack.bundle.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        cache: true,
        parallel: true,
        terserOptions: {
          extractComments: "all",
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});
