module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            {pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false},
            {pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false},
            {pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false},
            {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false},
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
            {pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false},

            {pattern: 'karma-test-shim.js', included: true, watched: true},

            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: true},
            {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: true},

            {pattern: 'build/**/*.js', included: false, watched: true}
        ],

        proxies: {
            '/lib/': '/base/lib/'
        },

        colors: true,

        autoWatch: true,

        // Karma plugins loaded
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],

        browsers: ['PhantomJS'],

        singleRun: true
    })
};