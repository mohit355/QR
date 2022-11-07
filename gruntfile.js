module.exports = function (grunt) {

  
  if (grunt.option('basepath')) {
        grunt.config('basepath', basepath);
  } else {
        grunt.config('basepath', __dirname);
  }

  const basepath=grunt.config('basepath');
  console.log(grunt.option('env'));

  var buildDir = '/build';
  var outputDir =basepath+buildDir;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
            src: basepath+"/src",
            output: outputDir,
        },
    cssmin: {
            options: {
                level: {
                    1: {
                        specialComments: 0
                    }
                }
            },
            generic: {
                files: {
                    '<%= dirs.output %>/prod/css/styles.css': '<%= dirs.output %>/prod/css/styles.css',
                }
            },
        },
    terser: {
      pages: {
        options: {
          compress: true,
          safari10: true,
          ecma: 2018,
          sourceMap: {
            includeSources: true,
          },
        },
        files: [
          {
            src: '<%= dirs.output %>/prod/index.js',
            dest: '<%= dirs.output %>/prod/index.js',
            ext: '.js',
          },
        ],
      },
    },
    copy: {
            dev: {
                files: [
                    { expand: true, cwd: '<%= dirs.src %>', src: ['**'], dest: '<%= dirs.output %>/dev', filter: 'isFile' },
                ]
            },
            prod: {
                files: [
                    { expand: true, cwd: '<%= dirs.src %>', src: ['**'], dest: '<%= dirs.output %>/prod', filter: 'isFile' },
                ]
            },
          },
    inline: {
      dist: {
        options:{
        tag: ''
      },
        src: '<%= dirs.output %>/prod/index.html',
        dest: '<%= dirs.output %>/prod/index.html'
      }
    },

    clean: {
      prod:['<%= dirs.output %>/prod'],
      contents:['<%= dirs.output %>/prod/assets','<%= dirs.output %>/prod/css','<%= dirs.output %>/prod/libs','<%= dirs.output %>/prod/index.js','<%= dirs.output %>/prod/index.js.map'],
      dev:['<%= dirs.output %>/dev']
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-terser'); 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-inline');
  grunt.registerTask('build:dev', ['clean:dev','copy','clean:prod']);
  grunt.registerTask('build:prod', ['clean:prod','copy:prod','cssmin','terser','inline','clean:contents','clean:dev']);
};