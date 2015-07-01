var gulp = require('gulp'),
    gutil   = require('gulp-util'),
    browserSync = require('browser-sync'),
    config = require('../GulpConfig');

// Build your vendors
gulp.task('vendor', require('./tasks/vendor'));

// Concatenate your partials and append them to template.html
gulp.task('templates', require('./tasks/templates'));

// Build my css (with sass compilation
gulp.task('styles', require('./tasks/styles'));

// Check if the code is correct
gulp.task('lint', require('./tasks/lint'));

// Concat all file js in script (with bowerify // use require)
gulp.task('scripts', ['lint'], require('./tasks/scripts'));

// Move index
gulp.task('index', require('./tasks/index'));

// Move our assets
gulp.task('assets', require('./tasks/assets'));

// Build and increment the manifest version
gulp.task('manifest', require('./tasks/manifest'));

// Task all files in the /app folder and zip them
gulp.task('zip', require('./tasks/zip'));

// Copy the screenshots folder content into the build destination
gulp.task('screenshots', require('./tasks/screenshots'));

// Build your i18n files
gulp.task('i18n', require('./tasks/i18n'));

// Init task is use when you start the project
gulp.task('init', require('./tasks/init'));

// Run all you special tasks
gulp.task('customTask', function () {
    if (config.customTasks) {
        for (var i = 0; i < config.customTasks.length; i++) {
            gulp.start(require(config.project + config.customTasks));
        }
    }
});

// Set the env config to production
gulp.task('envProd', function () {
    gutil.env.type = 'production';
});

// Set the env config to production
gulp.task('envWatch', function () {
    gutil.env.opt = 'watch';
});

/*******
 * Main TASKS
 */
// normal QA Build
gulp.task('build', ['screenshots', 'dev', 'manifest'], function () {
    gulp.start('zip');
});
//Production Build (normal build + git)
gulp.task('prod', ['envProd', 'build']);

//Launch the e2e and unit test
gulp.task('test', require('./tasks/unitTest'));

// Create a zip and upload the application on the manager
gulp.task('deploy', ['prod'], function () {
    gulp.start('upload');
});

// Build and move the mbo for this application
gulp.task('dependencies', require('./tasks/dependencies'));

// Dev build
gulp.task('dev', ['customTask', 'index', 'assets', 'vendor', 'templates', 'i18n', 'styles', 'scripts'], function() {
    gulp.start('test');
});

// Dev build + add the watch and the livereload on the sources
gulp.task('serve', ['watch', 'dev'], function () {
    browserSync({
        server : {
            baseDir: config.project
        },
        ui:{
            port: 3000,
            weinre :{
                port:3001
            }
        },
        port: (gutil.env.p ? gutil.env.p : config.defaultPort),
        open:false,
        notify: false
    })
});

// Launch your watch on file
gulp.task('watch', function () {
    gulp.watch(config.project + 'src/styles/**/*', ['envWatch', 'styles']);
    gulp.watch(config.project + 'src/scripts/**/*.js', ['envWatch', 'scripts']);
    gulp.watch(config.project + 'test/**/*.js', ['test']);
    gulp.watch(config.project + 'src/assets/**/*', ['envWatch', 'assets']);
    gulp.watch(config.project + 'src/scripts/**/*.html', ['envWatch', 'templates']);
    gulp.watch(config.project + 'src/index.html', ['envWatch', 'index']);
    gulp.watch(config.project + 'src/i18n/**', ['envWatch', 'i18n']);
});

// The default task run the prod build
gulp.task('default', ['build']);
