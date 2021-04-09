const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
module.exports = env => ({
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin(),
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
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({}),
  ],
});
