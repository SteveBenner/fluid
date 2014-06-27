# FluidApp
#
module Hydronamic
	# Scripts and styles propagated and shared throughout all FluidApps
	attr_accessor :global_styles, :global_scripts

	class FluidApp
		attr_accessor :name, :path
		attr_reader :styles, :scripts

		def initialize(name, path, styles=[], scripts=[])
			@name = name
			@styles = styles
			@scripts = scripts
		end

		# todo: method - update all code for app
	end
end