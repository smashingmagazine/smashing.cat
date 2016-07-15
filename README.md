# Smashing.cat

This repo holds all code for the [http://smashing.cat](smashing.cat) project.

## A few things to mention

I am loading a stylesheet with the font-face declarations and the woff2 versions of the fontfiles with `preload` in order to have them as soon as possible in supporting browsers.

At the end of the body I'm using `loadCSS` and the `preload polyfill` by Filament Group in order to be safe with my assumptions made in the `<head>`. If JS fails or is disabled I have the `fonts.min.css` inside a `<noscript>` block.

Apart from that it's mostly straight-forward. I'm using the sizes attribute for the `<img>` element in order to provide an SVG to capable browsers with a PNG fallback for all the others.

In the CSS I'm working with a few different mediaqueries to keep a reasonable, readable experience on spot for as many devices and viewport-sizes as possible.

## Hosting

The website is now hosted at Mediatemple.
