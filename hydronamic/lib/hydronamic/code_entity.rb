# CodeEntity
#
module Hydronamic
	class CodeEntity
		attr_accessor :name, :enabled, :patterns, :source

		URLPattern = Struct.new :pattern, :enabled
	end
end