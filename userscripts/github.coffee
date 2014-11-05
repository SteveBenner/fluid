# todo: move to `better-github` repo

# Fluid
window.fluid.include '/Users/neo/bower_components/velocity/velocity.min.js'

# CONSTANTS
UI_COLLAPSE_ANIMATION_DURATION = 300
UI_COLLAPSE_ANIMATION_EASING   = 'easeInOutExpo'

contribRepos = $('.boxed-group.flush[role="navigation"]')
list = contribRepos.children '.mini-repo-list'
listHeight = list.height()

# FEATURE: Clicking side-panel headers toggles collapsed/expanded state
contribRepos.children('h3').on 'click', ->
  if list.hasClass 'collapsed'
    list.animate {height: listHeight}, UI_COLLAPSE_ANIMATION_DURATION, UI_COLLAPSE_ANIMATION_EASING, ->
      $(this).children().css 'display', 'list-item'
  else
    list.animate {height: 0}, UI_COLLAPSE_ANIMATION_DURATION, UI_COLLAPSE_ANIMATION_EASING, ->
      $(this).children().css 'display', 'none'
  list.toggleClass 'collapsed'
