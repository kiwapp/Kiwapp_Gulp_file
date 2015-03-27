var gulp = require('gulp'),
    gutil = require('gulp-util'),
    protractor = require('gulp-protractor').protractor;

module.exports = function (done) {
    if (gutil.env.notest) {
        gutil.log(gutil.colors.yellow('Warning : Tests protractor are skipped'));
        return;
    }
    return gulp.src([config.project + "test/e2e/**/*.js"])
        .pipe(protractor({
            configFile: '../protractor.conf.js',
            args: ['--baseUrl', 'http://localhost:8080']
        }))
        .on('error', function(e) {
            console.log(e)
        });
};
