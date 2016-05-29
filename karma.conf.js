// Karma configuration
// Generated on Fri May 20 2016 10:43:27 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './public/scripts/vendor/angular/angular.min.js',
      './public/scripts/vendor/angular-animate/angular-animate.js',
      './public/scripts/vendor/angular-route/angular-route.js',
      './public/scripts/vendor/angular-mocks/angular-mocks.js',
      './public/scripts/vendor/angular-cookies/angular-cookies.js',
      './public/scripts/vendor/angular-sanitize/angular-sanitize.js',
      './public/scripts/vendor/angular-touch/angular-touch.js',
      './public/scripts/vendor/angular-resource/angular-resource.js',
      //'test/lib/angular.min.js',
      //'test/lib/angular-route.js',
      'test/lib/socket.io-1.4.5.js',
      'test/lib/jquery-1.12.2.min.js',
      'test/lib/bootstrap.min_3.3.6.js',
      //'test/lib/angular-mocks.js',

      //'./public/scripts/**/*.js',
      './public/scripts/app.js',
      './public/scripts/services/menuservice.js',
      './public/scripts/controllers/main.js',


      './test/unit/main.js'
    ],


    // list of files to exclude
    exclude: [
      //'./public/scripts/vendor/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
