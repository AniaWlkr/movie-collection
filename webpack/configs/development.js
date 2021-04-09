const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../utils/paths');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = env => ({
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //   }),
  // ],
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin([
      { path: './src/partials/head.html', priority: 'high', location: 'head' },
      { path: './src/partials/loader.html' },
      { path: './src/partials/header.html' },
      { path: './src/partials/main.html' },
      { path: './src/partials/footer.html' },
      { path: './src/partials/modal.html' },
      { path: './src/partials/modalGroup.html' },
      { path: './src/partials/modalTrailer.html' },
      { path: './src/partials/modalAuth.html' },
    ]),
  ],
  devServer: {
    contentBase: paths.BUILD_DIR,
    publicPath: '',
    historyApiFallback: true,
    compress: true,
    port: 4040,
    noInfo: true,
    quiet: true,
    clientLogLevel: 'warning',
    stats: 'errors-only',
    open: true,
  },
});
