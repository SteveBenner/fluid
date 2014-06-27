#!/usr/bin/env ruby
#
# Generate a markdown README with icon previews
# NOTE: all image file names must end with a hyphen, followed by a size in pixels
#

images = Dir.glob("*.{png,jpg}").reduce({}) do |list, img|
	# divide files into arrays - one for each unique img size
	if img =~ /-(\d*)\./
		if list[$1]
			list[$1] << img
		else
			list[$1] = [img]
		end
	end
	list
end

# create README file
File.open 'README.md', 'w' do |f|
	f.puts '# App Icons'
	f.puts File.read 'LEGAL.md' # insert legal disclaimer
	f.puts ''
	f.puts '---'
	images.sort_by { |size, i| size.to_i }.reverse_each do |dimension, images|
		f.puts "## #{dimension} px"
		images.each do |path|
			title = path.scan(/(\w*)-/).flatten.map(&:capitalize).join(' ')
			f.puts "![#{title}](#{path})"
		end
		f.puts ''
	end
end
