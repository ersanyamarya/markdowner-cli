import { join } from 'path'
import { getFileDataAndDir, getMatchedContent, log, replaceCommentBody, REPLACER_REGEXP } from '../utils'
import { getReplacementBlock } from './replacementBlock'

interface RegexGroup {
  type: string
  ext: string
  replacer: string
  option: string
}

/**
 * It takes a comment, and a file directory, and returns a modified comment
 * @param {string} comment - The comment to be replaced
 * @param {string} fileDir - The directory of the file that contains the comment.
 * @returns A string that is the comment with the replacement block inserted.
 */
const parseComment = (comment: string, fileDir: string) => {
  const { type, replacer, ext, option } = getMatchedContent(REPLACER_REGEXP, comment)?.groups as unknown as RegexGroup

  const replaceContentFile = join(fileDir, `${replacer}.${ext}`)
  log.blue(`> Reading file: ${replaceContentFile}`)

  const replacementFileContent = getFileDataAndDir(replaceContentFile).content

  const replacementBlock = getReplacementBlock(type, ext, option, replacementFileContent)

  return replaceCommentBody(comment, replacementBlock)
}

export default parseComment
