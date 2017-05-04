
var webpack = require('webpack');
var path = require('path');

//const DEBUG = !process.argv.includes('--release');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        /*'script!foundation-sites/dist/js/foundation.min.js',*/
        './src/index'
    ],
    output: {
        path:"./dist",
        filename: 'app.js',
        publicPath: 'dist/'
    },

    devServer: {
        historyApiFallback: true,
        port: 8082,
        hot: true,
        inline: true,
        progress: true,
        contentBase: "./",
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css?modules&localIdentName=[name]__[local]!sass'
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=[name].[ext]'},
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=[name].[ext]'},
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=[name].[ext]'},
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]' },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false"
            },
        ],
    },

    externals: {
        jquery: 'jQuery'
    },

    plugins: [
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery'
            })]
    ,

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    devtool: true ? 'cheap-module-eval-source-map' : false,
};
