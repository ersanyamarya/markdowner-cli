import parseComment from './parser'
import { log, MARKDOWNER_COMMENT_REGEX } from './utils'

const identifyAndReplaceComments = ({ content, dir }: { content: string; dir: string }): string => {
  const matched = content.match(MARKDOWNER_COMMENT_REGEX)
  if (matched !== null) {
    log.blue(`\n> Found ${matched.length} comments\n`)
    log.white(matched)
    for (const comment of matched) {
      const commentName = comment.split('\n')[0]
      log.blue(`\n> Replacing ${commentName}`)
      try {
        content = content.replace(comment, parseComment(comment, dir))
      } catch (err) {
        log.red(`error parsing ${commentName} : ${err}`)
      }
    }
  } else {
    log.red(`\n> No comments found\n`)
  }
  return content
}

export default identifyAndReplaceComments
