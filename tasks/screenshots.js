var gulp   = require('gulp'),
    gutil = require('gulp-util'),
    config = require('../../GulpConfig');

/**
 * Simply move the index.html file into the build folder
 */
module.exports = function() {
    return gulp.src(config.project + 'src/screenshots/**.*')
        .pipe(gulp.dest(config.dist + 'screenshots/'));
};
