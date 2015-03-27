var gulp   = require('gulp'),
    connect = require('browser-sync'),
    gutil = require('gulp-util');

/**
 * Simply move the index.html file into the build folder
 */
module.exports = function() {
    return gulp.src(config.project + 'src/**.*')
        .pipe(gulp.dest(config.project + config.dist))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
