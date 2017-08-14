# tsdom
Fast, lightweight DOM manipulation utility, written in TypeScript and usable anywhere.
**1.17kb** gzipped.
### Install
`npm install --save tsdom`
### Setup
Add the package to your project using one of the following:
- `let tsdom = require('tsdom')`
- `import tsdom from 'tsdom'`
- `<script src="./tsdom.inc.js" />` ("tsdom/dist/tsdom.inc.js")
### Usage
TSDom uses CSS (or jQuery) selector syntax, e,g:
- `let el = tsdom(element)`
- `let el = tsdom("div")`
- `let el = tsdom("#yourId")`
- `let el = tsdom(".yourClass")`
- `let el = tsdom("[data-attribute]")`
### API
Once you've selected an element or elements, you can chain the following methods:
- `el.find("#yourSelector")`
- `el.closest(".yourSelector")`
- `el.each(e => { // do something })`
- `el.append("<p>Lorem ipsum</p>")`
- `el.prepend("<p>Lorem ipsum</p>")`
- `el.addClass("yourClass")`
- `el.removeClass("yourClass")`
- `el.toggleClass("yourClass")`
- `el.css({ "opacity": "0" })`
- `el.attr({ "title": "Your new title" })`
- `el.on("click", (ev) => { // do something })`
- `el.on("click", ".yourClass", (ev) => { // do something })`
- `el.off("click")`

And the following are return methods
- `el.hasClass("active")`
- `el.html()`
- `el.html("<div>Lorem ipsum</div>")`
### Types
The package exports the following types for use in your app:
- `import tsdom, { TSDom, TSDomObject } from 'tsdom'`
  - `TSDom` == `tsdom`
  - `TSDomObject` == `tsdom("#yourSelector")`
