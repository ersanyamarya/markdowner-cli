import config from './config'
import parseComment from './parser'
import { log, MARKDOWNER_COMMENT_REGEX } from './utils'

const identifyAndReplaceComments = ({ content, dir }: { content: string; dir: string }): string => {
  const matched = content.match(MARKDOWNER_COMMENT_REGEX)
  if (matched !== null) {
    !config.silent && log.blue(`\n> Found ${matched.length} comments\n`)
    config.verbose && log.white('matched')
    config.verbose && log.white(matched)
    for (const comment of matched) {
      const commentName = comment.split('\n')[0]
      !config.silent && log.blue(`\n> Replacing ${commentName}`)
      try {
        content = content.replace(comment, parseComment(comment, dir))
      } catch (err) {
        config.error && log.red(`error parsing ${commentName} : ${err}`)
      }
    }
  } else {
    config.error && log.red(`\n> No comments found\n`)
  }
  return content
}

export default identifyAndReplaceComments
