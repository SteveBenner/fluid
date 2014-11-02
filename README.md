# Fluid
[Fluid](http://fluidapp.com/) is great. Take your favorite website, and make it an app. Genius? ***Completely***. Addicting? ***Entirely***.

## Resources

### [Icons](app-icons/)
By default, newly-created Fluid apps use the 'favicon' of a website as their dock icon. The results of this can vary widely, and more often than not I find myself  scouring the web for a nice high-quality PNG to use as a replacement. Feel free to browse my growing collection of app icons hosted in this repo; [previews can be found in the README][my collection], sorted by size. They are automatically generated via [this post-commit hook](https://github.com/SteveBenner/ruby-scripts/blob/master/git-hooks/pre-commit/generate-img-previews.rb).

## Userstyles
- Styles are written in SASS and compiled using Compass.
- For each Fluid app there is a corresponding SASS template with identical name, which compiles to a CSS file loaded as the default `userstyle` for that app.
- SASS partials provide flexibility in that they may be included into any app SASS file arbitrarily, but also act as templates for standalone `userstyle`.
- Patterns are handled in configuration. **todo:** link to config file or section

##### Developer Note:  
> [RubyMine](http://www.jetbrains.com/ruby/) really comes in handy for simple asset management--especially the latest version, which has built-in support for file watchers that offer compilation, compression, source maps, etc. via a single-click-install plugin. I often set up my projects to continuously monitor my SASS and CoffeeScript files and apply conversion and compression automatically, saving the resultant assets wherever I need them. The plugin configuration is highly flexible, and I quite recommend taking advantage of these tools.

## Development

**Tools I'm using**  

- Compass
- SAAS
- CoffeeScript

### Websites
- **TIP:** You can make your website Fluid-friendly by providing a nice high-def icon via a simple LINK tag.

    Example: `<link rel="fluid-icon" href="image-URI" title="app-name" />`

    > Set the `rel` to `fluid-icon`, the `href` to the high-res image location, and the `title` to the proposed application title and you're done! ([source](http://davidwalsh.name/fluid-app))

    Frankly I'm surprised this bears no mention on the [official Fluid developer page]; it's a very nice touch!

##### Conventions
- I like to append the word 'Mini' to an app name when it is to be pinned in the menu bar, and slimmed-down with CSS to offer a more 'lean' appearance. I style such apps as I would a mobile site, with a focus on performance and avoiding extraeneous content. So far I've really enjoyed the results from this, especially with sites that are hideously bloated with media and advertisements, such as [LastFM](http://www.last.fm/) for instance.

## Fluid App customization
I have lots of ideas of how Fluid apps could be hacked on and customized... For now though, I'll just share a few fairly obvious tips:

- **Gmail** - Obvious, but *especially* useful when you have multiple accounts and are tired of constantly switching sessions.
- **DataTools** - A half-dozen or so of my favorite online tools and utilities like JSON editors, Javascript compressors, etc. in tabs.
- **Music players** - also fairly obvious; I'm talking SoundCloud, MixCloud, GrooveShark, Pandora, LastFM, etc.

---

### COMING SOMEDAY: Fluidly, a tool suite for working with Fluid apps!
I've started [a micro library](https://github.com/SteveBenner/fluidly) to act as an object-oriented interface for working with userstyles and userscripts, and I have plans to grow it into a fully fledged tool suite for enhancing Fluid app development.

[official Fluid developer page]:http://fluidapp.com/developer/
[my collection]:app-icons/README.md