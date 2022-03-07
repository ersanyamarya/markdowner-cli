import { error, silent, verbose } from './config'
import parseComment from './parser'
import { log, MARKDOWNER_COMMENT_REGEX } from './utils'

const identifyAndReplaceComments = ({ content, dir }: { content: string; dir: string }): string => {
  const matched = content.match(MARKDOWNER_COMMENT_REGEX)
  if (matched !== null) {
    !silent && log.blue(`\n> Found ${matched.length} comments\n`)
    verbose && log.white(matched)
    for (const comment of matched) {
      const commentName = comment.split('\n')[0]
      !silent && log.blue(`\n> Replacing ${commentName}`)
      try {
        content = content.replace(comment, parseComment(comment, dir))
      } catch (err) {
        error && log.red(`error parsing ${commentName} : ${err}`)
      }
    }
  } else {
    error && log.red(`\n> No comments found\n`)
  }
  return content
}

export default identifyAndReplaceComments
