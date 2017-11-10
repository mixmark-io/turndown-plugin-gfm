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

    if (node.parentNode.nodeName === 'THEAD') {
      for (var i = 0; i < node.childNodes.length; i++) {
        var align = node.childNodes[i].attributes.align
        var border = '---'

        if (align) border = alignMap[align.value] || border

        borderCells += cell(border, node.childNodes[i])
      }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '')
  }
}

rules.table = {
  filter: 'table',
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

function cell (content, node) {
  var index = Array.prototype.indexOf.call(node.parentNode.childNodes, node)
  var prefix = ' '
  if (index === 0) prefix = '| '
  return prefix + content + ' |'
}

export default function tables (turndownService) {
  for (var key in rules) turndownService.addRule(key, rules[key])
}
