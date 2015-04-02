# Workaround Compass bug
require "fileutils"

module Compass::SassExtensions::Functions::Sprites
	def sprite_path(map)
	  Sass::Script::String.new(map.filename)
	end
	Sass::Script::Functions.declare :sprite_path, [:map]
end
