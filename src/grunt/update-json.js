module.exports = function(grunt) {
	"use strict";

	// Merge *.json package managers config files
	grunt.config("update_json", {
		// move changes from package.json to bower.json
		bower: {
			src: "package.json",
			dest: "bower.json",
			fields: [
				"name",
				"version",
				"homepage",
				"authors",
				"description",
				"main",
				"keywords",
				"license",
				"ignore"
			],
		},
	});

	grunt.loadNpmTasks("grunt-update-json");
};
