###
==UserScript==
@name        Reload
@namespace   http://fluidapp.com
@description Refreshes page at given interval
@include     *
@author      Todd Ditchendorf
==/UserScript==
###

delayInSeconds = 30
setInterval((-> window.location.reload), 1000 * delayInSeconds )
