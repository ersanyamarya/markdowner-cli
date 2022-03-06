const REPLACER_REGEXP =
  /<!-- \[(?<type>[^ ]*)\]\((?<replacer>[^ ]*)\.(?<ext>[^ ]*)\) -->(?<body>[\s\S]*?)<!-- \[\/(?<typeClose>[^ ]*)\] -->/g

const COMMENT_BODY = /-->[\s\S]*?<!--/g
export { REPLACER_REGEXP, COMMENT_BODY }
