module.exports = function(grunt) {
	"use strict";

	// Compile Compass style sheets
	grunt.config("compass", {
		options: {
			// Load all extensions
			require: [
				"./<%= paths.assets %>/compass/fix_sprite_path.rb",
			],
			// To enable relative paths to assets via compass helper functions. Uncomment:
			outputStyle: "nested",
			relativeAssets: true,
			// To disable debugging comments that display the original location of your selectors. Uncomment:
			noLineComments: true,
			// We prefer SASS files
			raw: "preferred_syntax = :sass\n",
			// Add hashes to assets
			assetCacheBuster: true,
			// Where do we take sources
			sassDir: "./<%= paths.assets %>/sass/",
			imagesDir: "./<%= paths.assets %>/img/",
			importPath: "./<%= paths.vendor %>/",
			extensionsDir: "./<%= paths.vendor %>/",
			// Where we going to put them
			javascriptsDir: "./<%= paths.build %>/js/",
			cacheDir: "./<%= paths.tmp %>/compass/",
			httpPath: "./<%= paths.build %>/",
			cssDir: "./<%= paths.build %>/css/",
			fontsDir: "./<%= paths.build %>/fonts/",
			generatedImagesDir: "./<%= paths.build %>/img/",
		},

		dev: {
			options: {
				environment: "development",
			},
		},

		prod: {
			options: {
				environment: "production",
				outputStyle: "compressed",
				force: true,
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-compass");
};
