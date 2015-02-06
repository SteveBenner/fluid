# really pathetic attempt to highlight code
curr = $('.content[contenteditable]:focus');
curr.keypress (e) ->
  console.log 'fired'
  if e.which == 192
    $(this).html (i, html) ->
      return html.replace /`(.*?)`/, '<code class="highlight">$1</code>'
