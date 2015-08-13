# Smashing.cat

This repo holds all code for the [http://smashing.cat](smashing.cat) project.

## A few things to mention

Currently I built only the placeholder-/landing-page. The page weighs 18kb and with webfonts it goes up to 190kb.

I am loading the webfonts with standard `@font-face` syntax but with the FontFaceObserver script I wait for the download for all fonts being ready and only then I add them to the site by adding a class to the HTML element.

That way we don't have a FOIT or FOUT or anything and we are much faster than with the pick-pocket localStorage URI trick.

Apart from that it's mostly straight-forward. I'm using the sizes attribute for the `<img>` element in order to provide an SVG to capable browsers with a PNG fallback for all the others.

In the CSS I'm working with a few different mediaqueries to keep a reasonable, readable experience on spot for as many devices and viewport-sizes as possible.