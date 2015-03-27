var gulp        = require('gulp'),
    htmlify = require('gulp-angular-htmlify'),
    templateCache = require('gulp-angular-templatecache'),
    connect = require('browser-sync'),
    gutil = require('gulp-util');

/**
 * concat all your file html (partials in the angular application)
 */
module.exports = function() {
    return gulp.src(config.project + 'src/scripts/**/*.html')
        .pipe(htmlify())
        .pipe(templateCache('templates.js',{
            module: config.name
        }))
        .pipe(gulp.dest(config.project + config.dist + 'js'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
