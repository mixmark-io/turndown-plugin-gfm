var indexOf = Array.prototype.indexOf
var every = Array.prototype.every
var rules = {}

rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content, node) {
    return cell(content, node)
  }
}

rules.tableRow = {
  filter: 'tr',
  replacement: function (content, node) {
    var borderCells = ''
    var alignMap = { left: ':--', right: '--:', center: ':-:' }

    if (isHeadingRow(node)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var border = '---'
        var align = (
          node.childNodes[i].getAttribute('align') || ''
        ).toLowerCase()

        if (align) border = alignMap[align] || border

        borderCells += cell(border, node.childNodes[i])
      }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '')
  }
}

rules.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function (node) {
    return node.nodeName === 'TABLE'
  },

  replacement: function (content, node) {
    // If table has no heading, add an empty one so as to get a valid Markdown table
    var firstRow = node.rows.length ? node.rows[0] : null
    var columnCount = firstRow ? firstRow.childNodes.length : 0
    var emptyHeader = ''
    if (columnCount && !isHeadingRow(firstRow)) {
      emptyHeader = '|' + '     |'.repeat(columnCount) + '\n' + '|' + ' --- |'.repeat(columnCount)
    }

    // Ensure there are no blank lines
    content = content.replace('\n\n', '\n')
    return '\n\n' + emptyHeader + content + '\n\n'
  }
}

rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) {
    return content
  }
}

// A tr is a heading row if:
// - the parent is a THEAD
// - or if its the first child of the TABLE or the first TBODY (possibly
//   following a blank THEAD)
// - and every cell is a TH
function isHeadingRow (tr) {
  var parentNode = tr.parentNode
  return (
    parentNode.nodeName === 'THEAD' ||
    (
      parentNode.firstChild === tr &&
      (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode)) &&
      every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
    )
  )
}

function isFirstTbody (element) {
  var previousSibling = element.previousSibling
  return (
    element.nodeName === 'TBODY' && (
      !previousSibling ||
      (
        previousSibling.nodeName === 'THEAD' &&
        /^\s*$/i.test(previousSibling.textContent)
      )
    )
  )
}

function cell (content, node) {
  var index = indexOf.call(node.parentNode.childNodes, node)
  var prefix = ' '
  if (index === 0) prefix = '| '
  return prefix + content + ' |'
}

export default function tables (turndownService) {
  turndownService.keep(function (node) {
    return node.nodeName === 'TABLE'
  })
  for (var key in rules) turndownService.addRule(key, rules[key])
}
