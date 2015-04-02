module.exports = function(grunt) {
	"use strict";

	// Hint any potential problems with JS
	grunt.config("jshint", {
		options: {
			force: true,
		},
		dev: ["./<%= paths.assets %>/js/**/*.js"],
		grunt: [
			"./<%= paths.tasks %>/**/*.js",
			"Gruntfile.js",
		],
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
};
