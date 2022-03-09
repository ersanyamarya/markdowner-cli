import { join } from 'path'
import config from '../config'
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
const parseComment = (comment: string, fileDir: string): string => {
  try {
    const {
      type,
      replacer,
      ext = '',
      option,
    } = getMatchedContent(REPLACER_REGEXP, comment)?.groups as unknown as RegexGroup
    config.verbose &&
      log.white(`\n> Parsing comment: ${comment}, type: ${type}, replacer: ${replacer}, ext: ${ext}, option: ${option}`)

    const replaceContentFile = type !== 'MAKEFILE' ? join(fileDir, `${replacer}.${ext}`) : join(fileDir, replacer)
    config.verbose && log.white(`> Replacing with content file: ${replaceContentFile}`)
    !config.silent && log.blue(`> Reading file: ${replaceContentFile}`)

    const replacementFileContent = getFileDataAndDir(replaceContentFile).content
    config.verbose && log.white(`> Content of replacement file: ${replacementFileContent}`)

    const replacementBlock = getReplacementBlock(type, ext, option, replacementFileContent)
    config.verbose && log.white(`> Replacement block: ${replacementBlock}`)

    return replaceCommentBody(comment, replacementBlock)
  } catch (err) {
    config.error && log.red(`> Error parsing comment: ${err} \n ${comment}`)
    return comment
  }
}

export default parseComment
