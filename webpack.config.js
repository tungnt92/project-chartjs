const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: resolveAppPath('src'),
  output: {
    // Development filename output
    filename: 'build/bundle.js',
  },
  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('src/index.html'),
    }),
  ],
  devServer: {
    contentBase: resolveAppPath('src'),
    compress: true,
    hot: true,
    host,
    port: 3000,
    publicPath: '/',
  },
};
