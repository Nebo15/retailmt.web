module.exports = function(grunt) {
	"use strict";

	// Minify HTML files
	grunt.config("htmlmin", {
    dev: {
      files: {
        "./<%= paths.build %>/index.html": "./<%= paths.assets %>/html/index.html",
        "./<%= paths.build %>/agreement.html": "./<%= paths.assets %>/html/agreement.html",
        "./<%= paths.build %>/privacy_policy.html": "./<%= paths.assets %>/html/privacy_policy.html",
      },
    },
		prod: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
      },
      files: {
        "./<%= paths.build %>/index.html": "./<%= paths.assets %>/html/index.html",
        "./<%= paths.build %>/agreement.html": "./<%= paths.assets %>/html/agreement.html",
        "./<%= paths.build %>/privacy_policy.html": "./<%= paths.assets %>/html/privacy_policy.html",
      },
    },
	});

	grunt.loadNpmTasks("grunt-contrib-htmlmin");
};
