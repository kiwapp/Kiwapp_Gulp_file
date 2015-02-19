var gulp = require('gulp'),
    config = require('../../GulpConfig'),
    gutil = require('gulp-util'),
    streamqueue = require('streamqueue');

/**
 * Move the microbackoffice setup into the build file
 * because of this you must have run the command gulp prod in the app-setup before making a prod build in the application
 * */
module.exports = function () {

    var stream = streamqueue({objectMode: true});
    for (var i = 0; i < config.projectsDependencies.length; i++) {
        var dep = config.projectsDependencies[i];
        stream.queue(gulp.src(dep.project + '**/*')
                .pipe(gulp.dest(config.dist + dep.dest))
        );
    }

    return stream.done();
};
