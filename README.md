Kiwapp_GulpFile
===============
Process gulp for a classic Kiwapp application (angular, sass, zip and deploy).

The project [boilerplateAngularJS](www.github.com) embed this process.
You can check the Readme for init your project.

If you want use them into an existing application, use has submodule git why the following command in your application folder: 

```shell
$ git submodule add git@github.com:kiwapp/Kiwapp_GulpFile.git
```

Important : Copy the file GulpConfig.temp.js (also protractor.temp.js and karma.temp.js for test) into your working directory and config it

For install all dev dependencies (npm):
 
```shell
$ npm install && gulp init
```
 
 The gulp init command will ask you a project name and a description for it 
 
## List available gulp commands :

 
 - Launch production build with the version specified in the manifest.json (this command line will build a .zip file with the resource under the build folder)
 
    ```shell
    $ gulp prod
    ```

    or

    ```shell
    $ gulp
    ```
    
- Launch production build with a version number (this command line will build a .zip file with the resource under the build folder)
 
    ```shell
    $ gulp prod --version 1.0.1
    ```


- Launch the dev build

    ```shell
    $ gulp dev
    ```
    
- Launch the dev build with the watcher and the livereload on the sources
 
    ```shell
    $ gulp serve
    ```
    
    Your application will be available at the http://localhost:8080/build
    
- Launch the dev build with the watcher and the livereload on the sources and with a clean source just before the build (to be sure there are no residual file
     
    ```shell
    $ gulp cserve
    ```
        
    Your application will be available at the http://localhost:8080/build
    
- Launch the unit test and the e2e test
     
    ```shell
    $ gulp test
    ```
        
    For install correctly karma and protractor see the next section
        
- Deploy a zip file on the Kiwapp manager

    ```shell
    $ gulp deploy
    ```
    
    Your application will be deployed on the Kiwapp manager
    The configuration for the deployment is in the GulpConfig file
    

## Install Protractor and Karma

### Protractor

Use npm to install Protractor globally.

```shell
$ npm install -g protractor
```
 
Try running `$ protractor --version` to make sure it's working.

You'll have to install selenium inside your protractor folder.
If you are at the Kiwapp_Gulpfile folder, you can do :

```shell
$ cd node_modules/protractor/bin/webdriver-manager update
```

Now you can check if you protractor folder has the `selenium` folder.

## Custom Task

You want do something only for your project your can add special task.

Go into your GulpConfig.js and add the path to your task into the array 'customTasks'
Your gulp serve, cserve, prod and dev task will run those task

In your task you have to use the notation:

var gulp = require(__dirname + '/Kiwapp_GulpFile/node_modules/gulp'),

For require your module into the node_modules but you can also add a package.json file to your project root 

# BrowserSync usage

We add to this tasks the browsersync plugins for front end developpement. You can access to the browsersync interface to http://localhost:3000 when your gulp serve is running

 
