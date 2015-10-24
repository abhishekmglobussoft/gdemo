// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    }  ,
     // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      ugly: {
        files: {
          'dist/js/magic.min.js': ['src/js/magic1.js','src/js/magic2.js']
        }
      }
    }  ,
      less: {
      build: {
        files: {
          'dist/css/pretty.css': 'src/css/pretty.less'
        }
      }
    },
     cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    },
    watch: {
  
  // for stylesheets, watch css and less files 
  // only run less and cssmin 
  stylesheets: { 
  files: ['src//*.css', 'src//*.less'], 
  tasks: ['less', 'cssmin'] },

  // for scripts, run jshint and uglify 
  scripts: { 
    files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
  } 
}


    // all of our configuration will go here

  });
 grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
