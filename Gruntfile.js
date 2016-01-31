module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "app/app.css": "app/autocomplete/less/autocomplete.less"
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js',
        'karma.conf.js',
        'app/app.js',
        'app/autocomplete/**/*.js'],
      options: {
        globals: {
          angular: true,
          console: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['less', 'jshint']);
};