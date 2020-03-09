import highlightedCodeBlock from './highlighted-code-block'
import noUrlEscape from './no-url-escape'
import strikethrough from './strikethrough'
import tables from './tables'
import taskListItems from './task-list-items'

function gfm (turndownService) {
  turndownService.use([
    highlightedCodeBlock,
    noUrlEscape,
    strikethrough,
    tables,
    taskListItems
  ])
}

export { gfm, highlightedCodeBlock, noUrlEscape, strikethrough, tables, taskListItems }
