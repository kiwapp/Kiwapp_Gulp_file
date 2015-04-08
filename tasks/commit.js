var gulp        = require('gulp'),
    git = require("gulp-git");

/**
 * concat all your file html (partials in the angular application)
 */
var options = {
	cwd: "../"
}
module.exports = function() {
    git.status(options,function(err,all) {
        console.log(all);
    });
    return null;
};
