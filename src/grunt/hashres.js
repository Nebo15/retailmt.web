module.exports = function(grunt) {
	"use strict";


	// TODO
	// Cache boosting
	grunt.config("hashres", {
		// Global options
		options: {
			encoding: "utf8",
			fileNameFormat: "${name}.${ext}?${hash}",
			renameFiles: false,
		},
		// hashres is a multitask. Here "prod" is the name of the subtask. You can have as many as you want.
		prod: {
			// Files to hash
			src: [
				"www/css/*.css",
				"www/js/*.js",
				"www/img/**/*.*",
			],
			// Target
			dest: "www/*.html",
		},
	});

	grunt.loadNpmTasks("grunt-hashres");
};
