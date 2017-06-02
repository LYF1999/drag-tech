const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config');

const opn = require('opn');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: '/index.html' },
    ]
  },
  proxy: {
    '/api': {
      target: 'http://0.0.0.0:8000/api/',
      pathRewrite: {'^/api' : ''},
      secure: false
    }
  },
  setup: function (app) {
    // app.get('/some/path', function (req, res) {
    //  you can set mock there,
    // });
  },
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err)
  }

  opn('http://localhost:3000/');

  console.log('Listening at http://localhost:3000/')
})