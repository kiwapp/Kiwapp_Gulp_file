var gulp = require('gulp'),
    gutil = require('gulp-util'),
    karma = require('karma').server,
    config = require('../../GulpConfig');

module.exports = function (done) {
    if (gutil.env.notest) {
        gutil.log(gutil.colors.yellow('Warning : Tests karma are skipped'));
        return;
    }
    karma.start({
        configFile: __dirname + '/' + config.project + '../karma.conf.js'
    },  done);
};
