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

// A tr is a heading row if:
// - the parent is a THEAD, assumed syntax with TH is correct
// - or if its the first child of the TABLE or the first TBODY
//   and every cell is a TH
function isHeadingRow (tr) {
  var parentNode = tr.parentNode;
  if(parentNode.nodeName === 'THEAD')
    return true
  if(parentNode.nodeName === 'TFOOT')
    return false
  if(parentNode.nodeName === 'TBODY') {
    var parentParentNode = parentNode.parentNode;
    if(parentParentNode.nodeName !== 'TABLE')
      return false;
    if(parentParentNode.rows[0] !== tr)
      return false;
    return every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
  }
  //no THEAD, TBODY nor TFOOT
  if(parentNode.nodeName !== 'TABLE')
    return false;
  if(parentNode.rows[0] !== tr)
    return false;
  return every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
}

function cell (content, node) {
  var index = indexOf.call(node.parentNode.childNodes, node)
  var prefix = ' '
  if (index === 0) prefix = '| '
  // Ensure single line per cell
  content = content.replace(/\n/g, ' ');
  return prefix + content + ' |'
}

export default function tables (turndownService) {
  turndownService.keep(function (node) {
    return node.nodeName === 'TABLE' && !isHeadingRow(node.rows[0])
  })
  for (var key in rules) turndownService.addRule(key, rules[key])
}
