var gulp = require('gulp'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    karma = require('karma').server,
    wiredep = require('wiredep'),
    notify = require('gulp-notify'),
    config = require('../../GulpConfig');

module.exports = function (done) {
    if (gutil.env.notest) {
        gutil.log(gutil.colors.yellow('Warning : Tests karma are skipped'));
        return;
    } else if(!fs.existsSync(__dirname + '/' + config.project + '../karma.conf.js')) {
        gutil.log(gutil.colors.yellow('Warning : No karma.config.js found, tests are skipped'));
        return;
    }

    // Get vendors files
    var listFiles = [];

    // Get dev dependencies
    var dependencies = wiredep({
        bowerJson: require('../../bower.json'),
        directory: "../src/vendor",
        devDependencies: true,
        dependencies: true
    });

    for (var i = 0; i < dependencies.js.length; i++) {
        listFiles.push('app/' + dependencies.js[i]);
    }

    listFiles.push('config/kiwapp_config.js');

    // Get app files
    listFiles.push('app/' + config.dist + 'js/**/app.js');

    // Get test files
    listFiles.push('app/' + config.test + '**/*.js');

    karma.start({
        configFile: __dirname + '/' + config.project + '../karma.conf.js',
        files: listFiles,
        singleRun: true
    }, function (e) {
        if(e > 0) {
            notify().write('Test failed ('+ e + ' errors)');
        }
        done();
    });
};
