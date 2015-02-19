var gulp = require('gulp'),
    del = require('del'),
    config = require('../../GulpConfig');

module.exports = function (cb){
    del(['../build'], {
        force: true
    }, cb);
};
