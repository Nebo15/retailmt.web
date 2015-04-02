module.exports = function(grunt) {
	"use strict";

	grunt.config("copy", {
		build: {
			// Deploy ready build to web folder
			files: [
				{
					expand: true,
					cwd: "./<%= paths.build %>",
					src: "**",
					dest: "./<%= paths.web %>/",
				},
			],
		},

		images_unprocessed: {
			// Move all images that is not moved by imagemin
			files: [
				{
					expand: true,
					cwd: "<%= imagemin.files[0].cwd %>",
					src: [
						"**",
						"!<%= imagemin.files[0].src %>",
					],
					dest: "<%= imagemin.files[0].dest %>",
					filter: "isFile",
				},
			],
		},

		vendor: {
			// Move all vendor files to its destination folder
			files: [
				// Fonts
				{
					expand: true,
					flatten: true,
					src: [
						"./<%= paths.vendor %>/**/*.{eot,ttf,woff,svg}",
					],
					dest: "<%= compass.options.fontsDir %>",
					filter: "isFile",
				},
				// Scripts (TODO: make it not manual)
				{
					expand: true,
					flatten: true,
					src: [
						// "./<%= paths.vendor %>/jquery/dist/jquery.js", Included in Uglify
						"./<%= paths.vendor %>/html5shiv/dist/html5shiv.js",
					],
					dest: "<%= compass.options.javascriptsDir %>",
					filter: "isFile",
				},
				// Styles (TODO: make it not manual)
				{
					expand: true,
					flatten: true,
					src: [
						"./<%= paths.vendor %>/bootstrap-common/css/bootstrap.css",
					],
					dest: "<%= compass.options.cssDir %>",
					filter: "isFile",
				},
			],
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
};
