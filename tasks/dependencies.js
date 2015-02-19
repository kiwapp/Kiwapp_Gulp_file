var gulp = require('gulp'),
    chug = require('gulp-chug'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig');

/**
 * Move the microbackoffice setup into the build file
 * because of this you must have run the command gulp prod in the app-setup before making a prod build in the application
 * */
module.exports = function () {
    var stream = streamqueue({objectMode: true});
    for (var i = 0; i < config.projectsDependencies.length; i++) {
        var dep = config.projectsDependencies[i];
        stream.queue(gulp.src(dep.projectGulp)
            .pipe(chug({
                tasks: [dep.task]
            }))
        );
    }

    return stream.done();
};
