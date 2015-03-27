var gulp = require('gulp'),
    del = require('del');

module.exports = function (cb){
    del(['../build'], {
        force: true
    }, cb);
};
