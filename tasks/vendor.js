var gulp = require('gulp'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig');

/**
 * Concat your dependencies (js or css)
 */
module.exports = function () {

    var wiredep = require('wiredep')({
        bowerJson: require('../../bower.json'),
        directory: "../src/vendor",
    });


    var stream = streamqueue({objectMode: true});
    if (wiredep.css && wiredep.css.length) {
        stream.queue(
            // The css dependencies
            gulp.src(wiredep.css)
                .pipe(gulp.dest(config.dist + 'styles'))
        );
    }
    if (wiredep.js && wiredep.js.length) {
        stream.queue(
            // The js dependencies
            gulp.src(wiredep.js)
                .pipe(concat('vendor.min.js', {newLine: ';\n'}))
                .pipe(gulp.dest(config.dist + 'js'))
        );
    }
    

    return stream.done();
};
