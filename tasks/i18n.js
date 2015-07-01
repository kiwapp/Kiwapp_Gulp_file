var path = require("path"),
    fs = require('fs'),
    gulp = require('gulp'),
    concat = require("gulp-concat"),
    convert = require('gulp-convert'),
    tap = require('gulp-tap'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig'),
    jeditor = require("gulp-json-editor");

/**
 * Build a languages.json from our Yaml files from
 * the directory i18n
 *
 * Each file must respect this convention
 * i18n/lang-LANG.yml
 *
 * Than just a file with key value
 */
module.exports = function () {

    if(config.translator === 'angular-translate') {
        // Build file for angular Translate
        return gulp.src(config.project + 'src/i18n/*.yml')
            .pipe(convert({
                from: 'yml',
                to: 'json'
            }))
            .pipe( jeditor(rewriteI18n))
            .pipe(gulp.dest(config.dist + 'i18n/'))
            .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
    }


    /**
     * List each directory inside i18n directory
     * From {@link https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md}
     * @param  {String} dir Directory
     * @return {Array}
     */
    function getFolders(dir) {
        if (fs.existsSync(dir)) {
            return fs.readdirSync(dir)
                .filter(function (file) {
                    return fs.statSync(path.join(dir, file)).isDirectory();
                });
        }
        return [];
    }

    var folders = getFolders(config.project + 'src/i18n');
    var stream = streamqueue({objectMode: true});

    // Create a stream for each content of directory
    for (var i = folders.length - 1; i >= 0; i--) {
        stream.queue(
            gulp.src(config.project + 'src/i18n/' + folders[i] + '/*.yml')
                .pipe(tap(function (file) {
                    // Each page translation
                    file.contents = new Buffer(path.basename(file.path, ".yml") + ":\n" + String(file.contents).replace(/^/gm, "  "));

                }))
                .pipe(concat(folders[i] + '.yml'))
                .pipe(tap(function (file) {
                    // Create a yaml beggining with the language to have an object lang-Lang: {key;value}
                    file.contents = new Buffer(path.basename(file.path, ".yml") + ":\n" + String(file.contents).replace(/^/gm, "  "));

                }))
        );
    };


    function rewriteI18n(source) {
        if (!gutil.env.template) {
            return source;
        }
        var json;
        try {
            json = JSON.parse(fs.readFileSync(gutil.env.template + "i18n/languages.json")) || {};
        } catch (err) {
            json = {};
        }
        function recursiveChange(source,info) {
            for(var key in info) {
                if (typeof source[key] === "object" && typeof info[key] === "object") {
                    source[key] = recursiveChange(source[key], info[key]);
                } else {
                    source[key] = info[key];
                }
            }
            return source;
        } 
        return recursiveChange(source,json);
    }

    return stream.done()
        .pipe(concat('languages.yml'))
        .pipe(convert({
            from: "yml",
            to: "json"
        }))
        .pipe(concat('languages.json'))
        .pipe( jeditor(rewriteI18n))
        .pipe(gulp.dest(config.dist + "i18n/"))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
