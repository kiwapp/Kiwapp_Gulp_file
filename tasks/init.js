var gulp = require('gulp'),
    bower = require('bower'),
    prompt = require('gulp-prompt'),
    replace = require('gulp-replace'),
    config = require('../../GulpConfig');

/**
 * The command init, will initialize all project variable
 * 3 steps :
 * - ask the name of your application and his display name
 * - replace the <%%=displayName%>, <%%=applicationName%> and <%%=description%> by the value ask by prompt
 * - TODO run the tests karma
 *
 */
module.exports = function () {

    /**
     * This method will put the input value to camel case
     * */
    function camelCase(input) {
        return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    }

    return gulp.src(config.project + "src/index.html")
        .pipe(
        prompt.prompt([
                {
                    type: 'input',
                    name: 'displayName',
                    message: 'Choose a name for your application : '
                },
                {
                    type: 'input',
                    name: 'desciption',
                    message: '(Optional) Insert a description for your application here : '
                }
            ], function (res) {
                console.log("Project initialization please wait a second...");
                // Callback method
                gulp.src(
                    [
                        config.project + '**/*.json',
                        config.project + '**/*.js',
                        config.project + '**/*.html',
                        config.project + '**/*.md',
                        '!./tasks/**/*',
                        '!./node_modules/**/*',
                        '!./src/vendor/**/*'
                    ])
                    .pipe(replace('<%%=displayName%>', res.displayName))
                    .pipe(replace('<%%=applicationName%>', camelCase(res.displayName)))
                    .pipe(replace('<%%=description%>', res.desciption))
                    .pipe(gulp.dest(config.project));
            }
        ));

};
