# Fluid
The Mac app [Fluid](http://fluidapp.com/) represents a revolutionary approach to Software, and it offers particularly exciting opportunities for web developers like myself. It's a new way of experiencing the internet, one in which the possibilities for customization are endless, and the sky is the limit. This repo represents my library of custom styles, scripts, and resources for Fluid apps.

## Resources

### [Icons](app-icons/)
By default, newly-created Fluid apps use the Favicon of their website as their Dock icon. The provided graphics can vary widely in quality, and more often than not I find myself  scouring the web for a nice high-quality PNG replacement. [Click here to browse my growing collection][my collection].

## [Userstyles](userstyles/)
Sometimes it only takes a little CSS to change your web experience. My favorite use for custom styling is to banish  advertisements, the cancer of the internet, forever from my sight!

- Styles are written in SASS and compiled using Compass.
- For each Fluid app there is a corresponding SASS template with identical name, which compiles to a CSS file loaded as the default `userstyle` for that app.
- SASS partials provide flexibility in that they may be included into any app SASS file arbitrarily, but also act as templates for standalone `userstyle`.

## Web Development 
[RubyMine](http://www.jetbrains.com/ruby/) is my tool of choice for web development, particularly since they added support for File Watchers capable of handling compilation, compression, and more. With advanced, flexible configuration features, I can set up my projects to continuously monitor assets like SASS and CoffeeScript, transpiling on-the-fly as I edit the source files.

**Technologies I use in development**

- Compass
- SAAS
- CoffeeScript
- Bower

### Tips & Ideas
- **You can make any website Fluid-friendly** by including a `<link>` element configured as follows:
    `<link rel="fluid-icon" href="image-URI" title="app-name" />`
    > Set the `rel` to `fluid-icon`, the `href` to the high-res image location, and the `title` to the proposed application title and you're done! ([source](http://davidwalsh.name/fluid-app))

    *Frankly, I'm surprised this great tip bears no mention on the [official Fluid developer page]!*

- **Slim down apps 'pinned' to the Status Bar for a better experience**
    - Many websites are partial or wholly responsive these days, so experiment with decreasing the viewport size in 'pinned' apps--often the mobile styles are much more suitable for this mode.
    - Use CSS to remove or hide extraneous portions of HTML from pinned apps wherever possible.
    
- **Examples of websites that are ideal for use with Fluid**
    - **Gmail** - Especially useful for those who wish to use multiple active accounts
    - **Web-based utilities** - Consolidate a dozen or so of your most-often used into a single 'toolbelt' app
    - **Music players** - SoundCloud, MixCloud, GrooveShark, Pandora, LastFM, etc. Music is life!!!

---

### COMING SOMEDAY: Fluidly, a tool suite for managing Fluid apps
I've started [a micro library](https://github.com/SteveBenner/fluidly) to act as an object-oriented interface for working with userstyles and userscripts, and I have plans to grow it into a fully fledged tool suite someday...

[official Fluid developer page]:http://fluidapp.com/developer/
[my collection]:app-icons/README.md