const entry = "./app/src/main.js";
module.exports = {
  entry: { main: [entry]},
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      }
    ]
  },
  stats: {
    colors: true,
  },
};
