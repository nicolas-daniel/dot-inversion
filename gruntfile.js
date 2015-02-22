module.exports = function(grunt) {

	grunt.initConfig({
		env: {
			dev: {
				NODE_ENV: 'dev'
			},
			prod: {
				NODE_ENV: 'prod'
			}
		},
		preprocess: {
			dev: {
				src: 'index.tpl',
				dest: 'index.html'
			},
			prod: {
				src: 'index.tpl',
				dest: 'prod/index.html'
			}
		},
		less: {
			prod: {
				options: {
					paths: ["css"]
				},
				files: {
					"css/style.css": "css/less/style.less"
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'prod/dist/style.min.css': ['css/reset.css', 'css/style.css']
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				src: [
					'vendor/*.js', 
					'js/app.js',
					'js/dot.js',
				],
				dest: 'prod/dist/main.min.js'
			}
		},
		watch: {
			css: {
				files: 'css/less/*.less',
				tasks: ['less'],
				options: {
					livereload: true,
				},
			},
			html: {
				files: 'index.tpl',
				tasks: ['preprocess:dev'],
				options: {
					livereload: true,
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-preprocess');

	grunt.registerTask('dev', ['env:dev', 'preprocess:dev', 'less', 'watch']);
	grunt.registerTask('prod', ['env:prod', 'preprocess:prod', 'less', 'cssmin', 'uglify']);

};