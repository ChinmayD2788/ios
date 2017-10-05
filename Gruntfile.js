module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['www/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },	

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
	  }
    },	
	
    jshint: {
      //files: ['Gruntfile.js', 'www/**/*.js', 'test/**/*.js'],
	  files: ['www/**/*.js', '../www/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },	
	
	ngdocs: {
		options: {

		//scripts: ['../src.js'],
		//scripts: ['angular.js', 'www/controllers/src.js', 'www/controllers/rcmDashboardController.js'],
		scripts: ['angular.js', 'www/RoundingModule.js'],
		dest: 'docs1',
		html5Mode: false,
		title: "Rounding Docs"
		//image: "path/to/my/image.png",
		//imageLink: "http://my-domain.com",
		//titleLink: "/api"	
		},		
			//all: ['www/**/*.js', '../www/controllers/src.js']
			//all: ['src.js']
			api: {
			    src: ['www/RoundingModule.js', 'www/controllers/**/*.js', 'www/Utils/**/*.js'],
				title: 'API Documentation Title'
			},
			tutorial: {
				title: 'Tutorial Title'
			},
			//all: [ 'www/**/*.js','../www/**/*.js']			
			//all: [ 'www/controllers/*.js']			
	},
		
    connect: {
      options: {
        keepalive: true
      },
      server: {}
    },	
	
	clean: ['docs1']

  });

  // Load the plugin that provides the "uglify" task.

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');   
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  //grunt.registerTask('test', ['jshint']);
  // Default task(s).
  //grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'ngdoc']);
  
  grunt.registerTask('default', ['clean', 'ngdocs', 'connect']);
  
};