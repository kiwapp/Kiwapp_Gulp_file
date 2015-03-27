var gulp = require('gulp'),
    zip = require('gulp-zip'),
    gutil = require('gulp-util');

/**
 * Build a zip file with all the content in the folder build
 */
module.exports = function () {

    // If the version and the name is not defined by any manifest or user action (--version)
    // You don't generate the zip file
    if(!gutil.env.name && !gutil.env.version) {
        return gutil.noop();
    }
    // We take the name of the application (this name is saved in the env configuration run command.
    // You can find this variable in the task manifest
    var zipname = gutil.env.name + '-' + gutil.env.version + '.zip';
    gutil.env.zipname = zipname;

    return gulp.src(config.project + config.dist + '**/*')
        .pipe(zip(zipname))
        .pipe(gulp.dest(config.project));
};
