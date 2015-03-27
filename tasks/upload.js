var request = require('request'),
    jeditor = require("gulp-json-editor"),
    gutil = require('gulp-util'),
    fs = require('fs');

/**
 * Upload the ziped file on the Kiwapp manager backoffice
 * See the gulpConfig file for chang the parameters
 *
 */
module.exports = function() {

    return setTimeout(function(){
        var r = request.post(config.urlApi + config.appToken, function(err, httpResponse, body) {
            if(err) {
                console.log(err);
            }
        });

        var form = r.form();
        form.append('zip', fs.createReadStream(config.project + gutil.env.zipname));
    }, 500);

};
