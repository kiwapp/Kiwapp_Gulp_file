var gulp = require('gulp'),
    jeditor = require("gulp-json-editor"),
    path = require('path');
    //config = require('../../GulpConfig');

/**
 * Concat your dependencies (js or css)
 */
module.exports = function () {


    return gulp.src(config.project + "package.json")
        .pipe(jeditor(function(json) {
            json.scripts = json.scripts || {};
            var gulpLocation = path.normalize(__dirname+"/../GulpFile.js");
            for (var task in gulp.tasks) {
                var taskCmd = "gulp --gulpfile "+gulpLocation +" " +task;
                json.scripts[task] = taskCmd;
            };
            return json; 
        }))
        .pipe(gulp.dest(config.project));
};
