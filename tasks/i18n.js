var gulp = require('gulp'),
    convert = require('gulp-convert'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    config = require('../../GulpConfig');

/**
 * Build a .json from our Yaml files in
 * the directory i18n
 *
 * Each file must respect this convention
 *
 * Than just a file with key value
 */
module.exports = function () {

    return gulp.src(config.project + 'src/i18n/*.yml')
        .pipe(convert({
            from: 'yml',
            to: 'json'
        }))
        .pipe(gulp.dest(config.dist + 'i18n/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
