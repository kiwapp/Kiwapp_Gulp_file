var gulp = require('gulp'),
    rm = require('gulp-rm'),
    config = require('../../GulpConfig');

module.exports = function (cb){
    return gulp.src("../build/**/*")
    	.pipe(rm());
};
