module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    files: [
      {pattern: './config.js', included: true},
      {pattern: './app/**/*.json', included: false},
      {pattern: './app/**/*.html', included: false},
      {pattern: './app/**/*.js', included: false},
      {pattern: './library/**/*.js', included: false},
      {pattern: './unit-tests/**/*.js', included: false}
    ],

    client: {
      clearContext: false
    },

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};