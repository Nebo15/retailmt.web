module.exports = function(grunt) {
	"use strict";

	require("time-grunt")(grunt);

	// Grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		paths: {
			tasks: "src/grunt",
			build: "<%= paths.tmp %>/build",
			web: "www",
			assets: "src",
			tmp: "var/grunt",
			vendor: "vendor/bower",
		},
	});

	// Load includes
	grunt.loadTasks(grunt.config.get("paths.tasks"));

	// Define tasks
	grunt.registerTask("default", []);

	// Get environment
	var target = grunt.option("target") == "prod" ? "prod" : "dev";

	grunt.registerTask("deploy:local", [
		"clean:build",
		"copy:build",
	]);

	grunt.registerTask("build",   [
		"clean:" + target,
		"copy:vendor",
		"jshint",
		"uglify:" + target,
		"compass:" + target,
		"concat:css",
		(target == "dev" ? "newer:" : "") + "imagemin:" + target,
		(target == "dev" ? "newer:" : "") + "copy:images_unprocessed",
		"htmlmin:" + target,
		"deploy:local",
	]);
};
