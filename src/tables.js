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
    return node.nodeName === 'TABLE' && isHeadingRow(node.rows[0])
  },

  replacement: function (content) {
    // Ensure there are no blank lines
    content = content.replace('\n\n', '\n')
    return '\n\n' + content + '\n\n'
  }
}

rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) {
    return content
  }
}

// Check that the parent or parent parent (in case of THEAD, TBODY or TFOOT) is a TABLE
// and it is matching the first row
// and every cell is a TH. Unless it is part of THEAD
function isHeadingRow (tr) {
  var parentNode = tr.parentNode
  var tableNode = parentNode
  if (tableNode.nodeName === 'THEAD' ||
     tableNode.nodeName === 'TFOOT' ||
     tableNode.nodeName === 'TBODY') {
    tableNode = parentNode.parentNode
  }
  if (tableNode.nodeName !== 'TABLE' || tableNode.rows[0] !== tr) {
    return false
  }
  if (parentNode.nodeName === 'THEAD') {
    return true
  }
  return every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
}

function cell (content, node) {
  var index = indexOf.call(node.parentNode.childNodes, node)
  var prefix = ' '
  if (index === 0) prefix = '| '
  // Ensure single line per cell
  content = content.replace(/\n/g, ' ')
  // | must be escaped as \|
  content = content.replace(/\|/g, '\\|')
  return prefix + content + ' |'
}

export default function tables (turndownService) {
  turndownService.keep(function (node) {
    return node.nodeName === 'TABLE' && !isHeadingRow(node.rows[0])
  })
  for (var key in rules) turndownService.addRule(key, rules[key])
}
