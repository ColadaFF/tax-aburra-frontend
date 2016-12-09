var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    config = {
        entry: [
            './src/index.js',
            'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
            'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
        ],
        devtool: 'eval',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/static/',
            pathinfo: true
        },
        resolve: {
            extensions: ['', '.jsx', '.scss', '.js', '.json', '.webpack.js', '.web.js'],  // along the way, subsequent file(s) to be consumed by webpack
            modulesDirectories: [
                'node_modules',
                path.resolve(__dirname, '../node_modules')
            ],
            alias: {}
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel'],
                    include: path.join(__dirname, '../src')
                },
                {
                    test: /\.css$/,
                    loader: "style!css?modules"
                }
            ]
        },
        noParse: /node_modules\/quill\/dist/,
        plugins: [
            new ExtractTextPlugin('styles.css', {allChunks: true}),  // compiled css (single file only)
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"'
            })
        ]
    };

module.exports = config;