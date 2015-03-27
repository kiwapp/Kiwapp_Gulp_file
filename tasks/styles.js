var gulp = require('gulp'),
    sass = require("gulp-sass"),
    concat = require('gulp-concat'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    clip = require('gulp-clip-empty-files');

/**
 * Concat our CSS and build the sass file
 */
module.exports = function () {

    return gulp.src(config.project + 'src/styles/*.*css')
        .pipe(clip())
        .pipe(sass({
            errLogToConsole: false,
            onError: function (err) {
                notify().write(err);
            }
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.project + config.dist + 'styles/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());

};
