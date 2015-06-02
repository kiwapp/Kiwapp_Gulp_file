var gulp = require('gulp'),
    jeditor = require("gulp-json-editor"),
    gutil = require('gulp-util'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig');

/**
 * Update the manifest for an app
 * It will generate a new codename and also set our env for the prod zip
 */
module.exports = function () {

    gulp.src(config.project + "src/manifest.json")
        .pipe(jeditor(function (json) {

            // Remove space from name
            gutil.env.name = json.app_info.name.replace(/ /g, "-");

            // Get the vesion number
            // The version can be found in the command line (gulp prod --version 1.0.1) or we use the version in the manifest
            //Here come the mess
            // Version = The release witch is being prepared
            // Codename = What we use for the zip and for the manager;
            // BuildID = The build Number 
            if (gutil.env.version) { // Si on specifie 
                json.app_info.version = gutil.env.version;
            } else if (json.app_info.version) {
                gutil.env.version = json.app_info.version
            } else {
                gutil.env.version  = json.app_info.version = "0.0.1";
            }

            if (gutil.env.type === "production") {
                json.app_info.codename = gutil.env.codename = gutil.env.version
            } else {
                var buildID = json.app_info.build_version = (json.app_info.build_version || 0) + 1 ;
                json.app_info.codename = gutil.env.codename = gutil.env.version +"-"+ buildID;
            }

            return json; // must return JSON object.
        }))
        .pipe(gulp.dest(config.project + "src"))
        .pipe(gulp.dest(config.dist));

    return gulp.src(config.project + 'bower.json')
        .pipe(jeditor(function (json) {

            if (gutil.env.version) {
                json.version = gutil.env.version;
            }
            return json; // must return JSON object.
        }))
        .pipe(gulp.dest(config.project));

};
