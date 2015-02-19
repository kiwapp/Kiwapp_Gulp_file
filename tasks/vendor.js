var gulp = require('gulp'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig');

/**
 * Concat your dependencies (js or css)
 */
module.exports = function () {

    var stream = streamqueue({objectMode: true});
    stream.queue(
        // The css dependencies
        gulp.src(config.cssVendors)
            .pipe(gulp.dest(config.dist + 'styles'))
    );

    stream.queue(
        // The js dependencies
        gulp.src(config.jsVendors)
            .pipe(concat('vendor.min.js', {newLine: ';\n'}))
            .pipe(gulp.dest(config.dist + 'js'))
    );

    return stream.done();
};
