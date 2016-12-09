var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var _ = require('lodash');
var path = require('path');

console.log(process.env.NODE_ENV);
let config;
if (process.env.NODE_ENV === "lab") {
    config = _.assign({}, require('./webpack/prod.config'), {
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/static/'
        }
    });
} else {
    config = require('./webpack/dev.config');
}

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
})
    .listen(3010, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3010');
    });