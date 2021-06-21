# turndown-plugin-gfm

A [Turndown](https://github.com/domchristie/turndown) plugin which adds GitHub Flavored Markdown extensions.

## Test Page

The test page can be found [here](https://guyplusplus.github.io/turndown-plugin-gfm/).

## Fork information

This is a fork of the original [turndown-plugin-gfm](https://github.com/domchristie/turndown-plugin-gfm) for general purpose. It is pending on this [pull request](https://github.com/domchristie/turndown-plugin-gfm/pull/31).

The changes are:
- migrated to node v5
- upgraded inclusion of turndown npm package to 7.0.0
- support tables with `caption` and `colgroup` elements
- support conversion of a multi-lines cell to a single line cell
- pipe character `|` are properly escaped in a table cell
- fix support for tables with no row
- support for `colspan`
- nested table inside a table render as is, gfm is not applied
- added more test cases accordingly

TODO:
- [ ] rowspan support
- [ ] support for relaxed and strict gfm (not html) rendering. So new lines, nested tables would render differently

## Installation

npm:

```
npm install @guyplusplus/turndown-plugin-gfm
```

Browser:

```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
<script src="https://unpkg.com/@guyplusplus/turndown-plugin-gfm/dist/turndown-plugin-gfm.js"></script>
```

## Usage

```js
// For Node.js
var TurndownService = require('turndown')
var TurndownPluginGfm = require('@guyplusplus/turndown-plugin-gfm')

var turndownService = new TurndownService()
TurndownPluginGfm.gfm(turndownService)
var markdown = turndownService.turndown('<strike>Hello world!</strike>')
```

turndown-plugin-gfm is a suite of plugins which can be applied individually. The available plugins are as follows:

- `strikethrough` (for converting `<strike>`, `<s>`, and `<del>` elements)
- `tables`
- `taskListItems`
- `gfm` (which applies all of the above)

So for example, if you only wish to convert tables:

```js
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService()
turndownService.use(tables)
```

## License

turndown-plugin-gfm is copyright © 2017+ Dom Christie and released under the MIT license.
