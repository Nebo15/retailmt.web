module.exports = function(grunt) {
	"use strict";

	var target = grunt.option("target") == "prod" ? "prod" : "dev";

	// Watch for file changes
	grunt.config("watch", {
		options: {
			spawn: false,
		},

		js: {
			files: "<%= jshint.dev %>",
			tasks: ["uglify", "newer:jshint:" + target, "newer:copy:build"],
			options: {
				livereload: true,
			},
		},

		grunt: {
			files: "<%= jshint.grunt %>",
			tasks: ["jshint:grunt"],
		},

		compass: {
			files: [
				"<%= compass.options.sassDir %>/**/*.{sass,scss}",
				"<%= compass.options.imagesDir %>/**/*",
				"<%= compass.options.importPath %>/**/*.{sass,scss}",
			],
			tasks: ["compass:" + target, "autoprefixer:" + target, "concat:css", "newer:copy:build"],
			options: {
				livereload: true,
			},
		},

		images_minify: { // TODO this is not working [ QQ ]
			files: "<%= imagemin." + target + ".files[0].cwd %>/<%= imagemin." + target + ".files[0].src %>",
			tasks: ["newer:imagemin:" + target, "newer:copy:build"],
			options: {
				livereload: true,
			},
		},

		images_copy: {
			files: "<%= copy.images_unprocessed.files[0].cwd %>/**",
			tasks: ["newer:copy:images_unprocessed"],
			options: {
				livereload: true,
			},
		},

		html: {
			files: ["./<%= paths.assets %>/html/**/*.html"],
			tasks: ["newer:htmlmin:" + target, "newer:copy:build"],
			options: {
				livereload: true,
			},
		},

		packages: {
			files: ["package.json"],
			tasks: ["update_json"],
		},
	});

	grunt.loadNpmTasks("grunt-contrib-watch");
};
