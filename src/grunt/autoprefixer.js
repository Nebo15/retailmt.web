module.exports = function(grunt) {
	"use strict";

	// Here we can move include files from bower components
	grunt.config("autoprefixer", {
		autoprefixer: {
			options: {
				browsers: [
					"> 2%",
					"last 2 versions",
					"ie 8",
					"ie 9",
					"android 2.3",
					"android 4",
					"opera 12.1"
				],
			},
		},
		dev: {
			options: {
				diff: true,
			},
			src: "<%= compass.options.cssDir %>/**/*.css",
		},
		prod: {
			src: "<%= compass.options.cssDir %>/**/*.css",
		},
	});

	grunt.loadNpmTasks("grunt-autoprefixer");
};
