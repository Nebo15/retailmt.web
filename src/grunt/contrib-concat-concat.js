module.exports = function(grunt) {
	"use strict";

	// Concat files
	grunt.config("concat", {
		options: {
      separator: ";",
      banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
    },

		css: {
			src: [
				"./<%= paths.vendor %>/bootstrap-common/css/bootstrap.min.css",
				"<%= compass.options.cssDir %>/main.css",
			],
			dest: "<%= compass.options.cssDir %>/all.css",
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
};
