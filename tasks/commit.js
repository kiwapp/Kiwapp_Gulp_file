var gulp = require('gulp'),
    fs = require('fs'),
    path = require("path"),
    gutil = require('gulp-util'),
    filter = require('gulp-filter'),
    config = require('../../GulpConfig'),
    git = require("gulp-git");

var parser = require('gitignore-parser'),
    fs = require('fs');

var gitignore = parser.compile(fs.readFileSync(__dirname+'/../../.gitignore', 'utf8'));

module.exports = function(cb) {
    if (gutil.env.git===false) {
        gutil.log("Git wont be used");
        return cb();
    }
    var pipe = gulp.src(config.project+"**/*")
        .pipe(filter(function(n) {
            var pt = path.relative(config.project,n.path);
            return gitignore.accepts(pt) && gitignore.accepts(pt+"/");
        }))
        .pipe(git.commit(gutil.env.version,{cwd: config.project, args: "--allow-empty"}))

    pipe.on("end",function(data) {
        git.tag(gutil.env.version, gutil.env.version, {cwd: config.project, args:"-f"}, function(err) {
            gutil.log(err);
            git.push('origin', 'HEAD', {cwd: config.project}, function (err) {
                if (err) throw err;
                git.push('origin', 'HEAD', {cwd: config.project, args:"--tags"}, function (err) {
                    if (err) throw err;
                    cb();
                 });
             });
        })
    });
    return;
};

