export default function noUrlEscape (turndownService) {
  var originalEscape = turndownService.escape
  turndownService.escape = function (string) {
    // Urls should not be escaped. Our strategy is using a regex to find them and escape everything
    // which is out of the matches parts.

    // Derived from https://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var regex = /\b(?:https?:\/\/|www\.)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’])/g

    var escaped = ''
    var lastIndex = 0
    var m
    do {
      m = regex.exec(string)

      // The substring should to to the matched index or, if nothing found, the end of the string.
      var index = m ? m.index : string.length

      // Append the substring between the last match and the current one (if anything).
      if (index > lastIndex) {
        escaped += originalEscape(string.substring(lastIndex, index))
      }

      // Append the match itself now, if anything.
      m && (escaped += m[ 0 ])

      lastIndex = regex.lastIndex
    }
    while (m)

    return escaped
  }
}
