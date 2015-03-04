/**
 * The url for the api Kiwapp you want use
 * @type {string}
 */
var urlApi = "https://api.kiwapp.com/nosecure/appInstance/";
/**
 * The application token for this application
 * You must have manuaaly uploaded on the Manager once
 * After that you find the application token in the interface
 * @type {string}
 */
var appToken = "123456";
/**
 * The destination folder you want yours built resources have been
 * @type {string}
 */
var dist = "../build/";

/**
 * The project sources folders
 * @type {string}
 */
var project = "../";

/**
 * The application name (in min case)
 * @type {string}
 */
var appName = "<%%=applicationName%>";

/**
 * List the project dependecies you want build
 * Is generally the microbackoffice dependencies
 * The order is important
 * @type {Array}
 */
var projectsDependencies = [
    {
        'dest': 'app-setup',
        'project' : '../../app-setup/build/',
        'projectGulp' : '../../app-setup/GulpFile.js',
        'task': 'prod'
    },
    {
        'dest': 'app-databrowser',
        'project' : '../../app-databrowser/build/',
        'projectGulp' : '../../app-databrowser/GulpFile.js',
        'task': 'prod'
    }
];

/**
 * List all libraries js dependencies
 * They will be concat into a vendor.js in the build/js folder
 * The link to vendor.js is already write into the index.html file
 * @type {*[]}
 */
var jsVendors = [
    project + 'src/vendor/angular/angular.min.js',
    project + 'src/vendor/angular-animate/angular-animate.min.js',
    project + 'src/vendor/angular-sanitize/angular-sanitize.min.js',
    project + 'src/vendor/angular-touch/angular-touch.min.js',
    project + 'src/vendor/angular-ui-router/release/angular-ui-router.min.js',
    project + 'src/vendor/moment/moment.js',
    project + 'src/vendor/kiwapp.js/kiwapp.js',
    project + 'src/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
    project + 'src/vendor/ngBabelfish/dist/bundle.js'

];

/**
 * List all libraries css dependencies,
 * They will be copied in the build/style folder so you must make a link to them into your index.html file
 * @type {*[]}
 */
var cssVendors = [
    project + 'src/vendor/bootstrap/dist/css/bootstrap.min.css'
];

/**
 * List of the custom task used for this project
 * The custom tasks are the task special for your project
 * In a normal case leave this array empty
 * This task will be launch in the dev, prod, serve and cserve build
 *
 * eg :  var customTasks = ['yourCustomTask'];
 *
 * @type {Array}
 */
var customTasks = [];

/**
 * The default port where the application is launched
 * @type {number}
 */
var defaultPort = 8080;

module.exports = {
    urlApi: urlApi,
    appToken: appToken,
    dist: dist,
    project: project,
    projectsDependencies: projectsDependencies,
    jsVendors: jsVendors,
    cssVendors: cssVendors,
    appName: appName,
    customTasks: customTasks,
    defaultPort: defaultPort
};
