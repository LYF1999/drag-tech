const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEV = process.env.NODE_ENV !== 'production';

const config = {
  entry: [
    './src/index.js'
  ],
  node: {
    __dirname: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: [],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader!awesome-typescript-loader",
        include: path.join(__dirname, 'src')
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.less$/,
        use: DEV ? [
          "style-loader",
          "css-loader",
          "less-loader",
        ] : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "less-loader",
          ],
        }),
      }, {
        test: /\.css$/,
        use: DEV ? [
          "style-loader",
          "css-loader",
        ] : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader']
        })
      },
    ]
  },
};

config.module.rules.push({
  test: /\.(jpe?g|png|gif|ttf|svg|eot|woff)$/i,
  loaders: DEV ? "url-loader" : 'file-loader',
  query: DEV ? {} : {
    name: 'static/[name]-[hash:8].[ext]',
    publicPath: config.output.publicPath,
  }
});


if (DEV) {
  config.devtool = '#cheap-module-eval-source-map';
  config.entry.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  );
  config.output.publicPath = 'http://localhost:3000/static/';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.module.rules.push()
} else {
  config.output.filename = "[name]-[chunkhash:8].js";
  config.plugins.push(new ExtractTextPlugin("index-[contenthash:8].css"));
}


module.exports = config;