import strikethrough from './strikethrough'
import tables from './tables'
import taskListItems from './task-list-items'

function gfm (turndownService) {
  turndownService.use([strikethrough, tables, taskListItems])
}

export { gfm, strikethrough, tables, taskListItems }
