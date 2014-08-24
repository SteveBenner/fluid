# Bootstrap jQuery into the DOM
#for url of ['//code.jquery.com/jquery-1.11.0.min.js','//code.jquery.com/jquery-migrate-1.2.1.min.js']
#for url of ['//code.jquery.com/jquery-1.11.0.min.js']
#  script = document.createElement('script')
#  script.type = 'text/javascript'
#  script.src = "http#{url}"
#  document.getElementsByTagName('head')[0].appendChild script

# Load JS libs locally via Fluid
sources = [
#  '/Users/neo/bower_components/jquery/dist/jquery.min.js', # jQuery (TOO NEW!!! WTF)
  '/Users/neo/github/fluid/assets/js/jquery-1.8.3.min.js', # jQuery
  # browser-based markdown converter/renderer
  '/usr/local/dev-web/tools/markdown/markdown-browser-0.6.0-beta1/markdown.min.js'
]
for src in sources
  window.fluid.include src
