var path = require("path");
module.exports = function(grunt) {
    grunt.file.defaultEncoding = 'utf8';
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                src: "./dist/"
            }
        },
        'concat': {
            options: {
                separator: '\r\n\r\n',
                banner: grunt.file.read(".version")
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/jquery.extends.js'
            }
        },
    };
    grunt.initConfig(config);
    grunt.registerTask("default", ['clean', 'concat']);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
};