module.exports = function(grunt) {
	"use strict";

	// Remove all generated files
	grunt.config("clean", {
		prod: [
			"!*/.gitkeep",
			"./<%= paths.tmp %>/*",
		],
		dev: [],
		cache: [
			"!*/.gitkeep",
			"./<%= paths.tmp %>/*",
		],
		build: [
			"!*/.gitkeep",
			"./<%= paths.web %>/img/*",
			"./<%= paths.web %>/css/*",
			"./<%= paths.web %>/js/*",
			"./<%= paths.web %>/*.html",
		]
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
};
