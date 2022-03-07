const MARKDOWNER_COMMENT_REGEX = /<!-- MD[\s\S]*? -->[\s\S]*?<!-- MD[\s\S]*? -->/g

const REPLACER_REGEXP =
  /<!-- MD\[(?<type>[\s\S]*?)\]\((?<replacer>[^ ]*)\.(?<ext>[^ ]*)\)\[(?<option>[\s\S]*?)\](?!.*\])[\s\S]*?<!-- MD[\s\S]*? -->/g

const COMMENT_BODY = /-->[\s\S]*?<!--/g

const OPTIONS = {
  START_STOP: /[^ ]*:[^ ]*/g,
  CSV: /[^ ]*,[^ ]*/g,
}

export { REPLACER_REGEXP, COMMENT_BODY, MARKDOWNER_COMMENT_REGEX, OPTIONS }
