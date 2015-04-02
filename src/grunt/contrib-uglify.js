module.exports = function(grunt) {
	"use strict";

	// Minify JS files
	grunt.config("uglify", {
		files: {
			"./<%= paths.build %>/js/all.min.js": [
				"./<%= paths.vendor %>/jquery/dist/jquery.js",
				"./<%= paths.assets %>/js/*.js",
			],
		},
		options: {
			banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
			except: [
				"jQuery",
				"Backbone",
				"$",
			],
    },
		dev: {
			options: {
        beautify: true,
				compress: false,
				sourceMap: true,
      },
			files: "<%= uglify.files %>",
		},
		prod: {
			options: {
				compress: {
					// Remove all Console.log statements
					drop_console: true,
					// This config will remove all if(DEBUG) { ... } blocks
					global_defs: {
						"DEBUG": false,
					},
					dead_code: true
				},
			},
			files: "<%= uglify.files %>",
		},
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
};
