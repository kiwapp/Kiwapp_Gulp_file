var gulp = require('gulp'),
    convert = require('gulp-convert'),
    connect = require('browser-sync'),
    gutil = require('gulp-util'),
    config = require('../../GulpConfig');

/**
 * Build a .json from our Yaml files in
 * the directory i18n
 *
 * Each file must respect this convention
 *
 * Than just a file with key value
 */
module.exports = function () {
    if(config.translator === undefined || config.translator === 'babelfish' ) {
        // Build i18n file for babelfish
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
        }
        ;

        return stream.done()
            .pipe(concat('languages.yml'))
            .pipe(convert({
                from: "yml",
                to: "json"
            }))
            .pipe(concat('languages.json'))
            .pipe(gulp.dest(config.dist + "i18n/"))
            .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
    }

    // Build file for angular Translate
    return gulp.src(config.project + 'src/i18n/*.yml')
        .pipe(convert({
            from: 'yml',
            to: 'json'
        }))
        .pipe(gulp.dest(config.dist + 'i18n/'))
        .pipe(gutil.env.opt === 'watch' ? connect.reload({stream:true}) : gutil.noop());
};
