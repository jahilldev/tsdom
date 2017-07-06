# tsdom
Fast, lightweight TypeScript DOM manipulation utility
### Install
`npm install --save tsdom`
### Setup
Add the package to your project using one of the following:
- `let tsdom = require('tsdom')`
- `import tsdom from 'tsdom'`
- `<script src="./tsdom.inc.js" />` ("tsdom/dist/tsdom.inc.js")
### Usage
TSDom uses CSS (or jQuery) selector syntax, e,g:
- `let el = tsdom("#yourId")`
- `let el = tsdom(".yourClass")`
- `let el = tsdom("[data-your-attribute]")`
### API
Once you've selected an element or elements, you can chain the following methods:
- `el.addClass("yourClass")`
- `el.removeClass("yourClass")`
- `el.css({ "opacity": "0" })`
- `el.on("click", (ev) => { // do something })`
- `el.on("click", ".yourClass", (ev) => { // do something })`
- `el.off("click")`
### Types
The package exports the following types for use in your app:
- `import tsdom, { TSDom, TSDomObject } from 'tsdom'`
  - `TSDom` == `tsdom`
  - `TSDomObject` == `tsdom("#yourSelector")`
