var gulp   = require('gulp'),
	prompt = require('gulp-prompt'),
	jeditor = require("gulp-json-editor"),
    gutil = require('gulp-util');

module.exports = function() {
	var version = "";
	var question = {
		type: 'input',
		name: "version",
		message: 'What version are you building ? : '
	}
    return gulp.src(config.project + 'src/manifest.json')
    	.pipe(jeditor(function(json) {
    		console.log(json)
    		version = question.default = json.app_info.codename || version;
    		return json;
    	}))
    	.pipe(prompt.prompt([question],function(res){
    		version = res.version;
    	}))
    	.pipe(jeditor(function(json) {
    		console.log(json,version)
    		json.app_info.codename = version;
    		return json;
    	}))
    	.pipe(gulp.dest(config.project + 'src/'));
};
