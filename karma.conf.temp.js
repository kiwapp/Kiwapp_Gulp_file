module.exports = function(config) {
    var configFile = require(__dirname + '/GulpConfig');

    // Load the vendors files
    var files = [];
    for(var i = 0; i<configFile.jsVendors.length; i++){
        files.push(__dirname + '/src/' + configFile.jsVendors[i]);
    }
    // Load the angular mock for jasmine
    files.push(__dirname + '/src/vendor/angular-mocks/angular-mocks.js');
    // Load the files
    files.push(__dirname + '/config/kiwapp_config.js');
    files.push(__dirname + '/build/js/app.js');
    // Load the tests
    files.push(__dirname + '/test/unit/**/*.js');

    config.set({
        frameworks: ['jasmine'],
        files: files,
        reporters: ['dots'],
        autoWatch: false,
        singleRun: true,
        browsers: ['PhantomJS']
    });
};
