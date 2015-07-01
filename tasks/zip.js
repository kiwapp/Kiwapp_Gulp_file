var gulp = require('gulp'),
    zip = require('gulp-zip'),
    gutil = require('gulp-util'),
    rm = require('gulp-rm'),
    config = require('../../GulpConfig'),
    path = require("path");

/**
 * Build a zip file with all the content in the folder build
 */
module.exports = function (cb) {

    // If the version and the name is not defined by any manifest or user action (--version)
    // You don't generate the zip file
    if(!gutil.env.name && !gutil.env.codename) {
        return gutil.noop();
    }
    // We take the name of the application (this name is saved in the env configuration run command.
    // You can find this variable in the task manifest
    var zipname = gutil.env.name + 
        (gutil.env.template ? "-" + path.basename(gutil.env.template) : "")  +
        (gutil.env.codename ? '-' + gutil.env.codename : "") + 
        '.zip';

    gutil.env.zipname = zipname;
    var a = gulp.src( config.project+gutil.env.name+"*-+([0123456789]).zip")
        .pipe(rm());

    a.on("end",function() {
        gulp.src(config.dist + '**/*')
            .pipe(zip(zipname))
            .pipe(gulp.dest(config.project));
    });
    return a;
};
