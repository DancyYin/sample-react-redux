var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/foundation-sites/dist/foundation.min.js',
            'src/**/*.test.js'
        ],
        preprocessors: {
            'src/**/*.test.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha'],
        client: {
            mocha: {
                timeout: '5000'
            }
        },

        mochaReporter: {
            colors: {
                success: 'blue',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'bgRed'
            }
        },

        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },

    });
};



