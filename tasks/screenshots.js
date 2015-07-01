var gulp   = require('gulp'),
    gutil = require('gulp-util'),
    config = require('../../GulpConfig');

/**
 * Simply move the index.html file into the build folder
 */
module.exports = function() {
	var files = [config.project + 'src/screenshots/**.*'];
	if (gutil.env.template) {
        files.push(gutil.env.template+"/screenshots/**/*");
    }
    return gulp.src(files)
        .pipe(gulp.dest(config.dist + 'screenshots/'));
};
