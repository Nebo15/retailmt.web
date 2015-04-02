module.exports = function(grunt) {
	"use strict";

	// Optimize images
	grunt.config("imagemin", {
		files: [{
			expand: true,
			cwd: "./<%= paths.assets %>/img",
			src: "**/*.{png,jpg,gif,ico}",
			dest: "./<%= paths.build %>/img"
		}],

		dev: {
			options: {
				optimizationLevel: 2,
			},
			files: "<%= imagemin.files %>",
		},

		prod: {
			options: {
				optimizationLevel: 5,
				pngquant: false,
			},
			files: "<%= imagemin.files %>",
		},
	});

	grunt.loadNpmTasks("grunt-contrib-imagemin");
};
