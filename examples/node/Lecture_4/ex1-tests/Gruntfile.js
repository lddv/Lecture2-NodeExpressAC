module.exports = function(grunt) {
  grunt.initConfig({
    nodemon: {
      express: {
        script: 'index.js',
        options: {
          watch: ['src/'],
          cwd: 'src'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'blanketWrapper'
        },
        src: ['tests/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['tests/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['nodemon:express']);
  grunt.registerTask('testServer', ['mochaTest']);
};