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
                    '<%= dirs.output %>/prod/css/base.css': '<%= dirs.output %>/prod/css/base.css',
                    '<%= dirs.output %>/prod/css/app.css': '<%= dirs.output %>/prod/css/app.css'
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
          },
          {
            src: '<%= dirs.output %>/prod/qrConfigs.js',
            dest: '<%= dirs.output %>/prod/qrConfigs.js',
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
    'string-replace':{
      html: {
                files: {
                    '<%= dirs.output %>/prod/index.html': '<%= dirs.output %>/prod/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /<!-- @import qrConfigs.js -->/ig,
                        replacement: '<script type="text/javascript" src="./qrConfigs.js" defer></script>'
                    }]
                }
                
            },
      qrColors: {
                files: {
                  '<%= dirs.output %>/prod/index.js': '<%= dirs.output %>/prod/index.js'
                },
                options: {
                    replacements: [{
                        pattern: 'qrCodeColorDark="#000000"',
                        replacement: 'qrCodeColorDark=qrCodeConfig.qrCode_dark_color'
                    },
                  {
                        pattern: 'qrCodeColorLight = "#ffffff"',
                        replacement: 'qrCodeColorLight=qrCodeConfig.qrCode_light_color'
                    }]
                }
            },
    },
    clean: {
      prod:['<%= dirs.output %>/prod'],
      contents:['<%= dirs.output %>/prod/assets','<%= dirs.output %>/prod/qrConfigs.js','<%= dirs.output %>/prod/qrConfigs.js.map','<%= dirs.output %>/prod/css','<%= dirs.output %>/prod/libs','<%= dirs.output %>/prod/index.js','<%= dirs.output %>/prod/index.js.map'],
      dev:['<%= dirs.output %>/dev']
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-terser'); 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.registerTask('build:dev', ['clean:dev','copy','clean:prod']);
  grunt.registerTask('build', ['clean:dev','copy','clean:prod']);
  grunt.registerTask('build:prod', ['clean:prod','copy:prod','string-replace:html','string-replace:qrColors','cssmin','terser','inline','clean:contents','clean:dev']);
};