var gulp = require('gulp'),
    fs = require('fs'),
    path = require("path"),
    gutil = require('gulp-util'),
    filter = require('gulp-filter'),
    config = require('../../GulpConfig'),
    git = require("gulp-git");

var parser = require('gitignore-parser'),
    fs = require('fs');

try {
    var gitignore = parser.compile(fs.readFileSync(config.project+'.gitignore', 'utf8'));
} catch (err) {
     var gitignore = parser.compile("");
}



module.exports = function(cb) {
    if (gutil.env.git===false) {
        gutil.log("Git wont be used");
        return cb();
    }
    console.log("start git");
    var pipe = gulp.src(config.project+"**/*")
        .pipe(filter(function(n) {
            var pt = path.relative(config.project,n.path);
            return gitignore.accepts(pt) && gitignore.accepts(pt+"/");
        }))
        .pipe(git.commit("gutil", {cwd:config.project, args:"--allow-empty"}))
        .on("error", function(err) {
            console.log("Error in the commit",err);
        })

    pipe.on("end",function(data) {
        console.log("Version Commited");
        git.tag(gutil.env.version, gutil.env.version, {cwd: config.project, args:"-f"}, function(err) {
            gutil.log(err);
            git.push('origin', 'HEAD', {cwd: config.project}, function (err) {
                if (err) throw err;
                git.push('origin', 'HEAD', {cwd: config.project, args:"--tags -f"}, function (err) {
                    if (err) throw err;
                    console.log("Version pushed");
                    cb();
                 });
             });
        })
    })
    .on("error",function(err) {
        console.log("errorr with git",err);
        cb()
    })
    return;
};

