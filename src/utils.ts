import { existsSync } from 'fs'
import { exit } from 'process'
import { COMMENT_BODY } from './regExp'

// CREATED BY SANYAM ARYA with love
/**
 * Given a regex and a string, return the first match of the regex in the string
 * @param {RegExp} regex - A regular expression that you want to match against the content.
 * @param {string} content - The content to be searched.
 * @returns The matched content.
 */
export const getMatchedContent = (regex: RegExp, content: string): RegExpExecArray | null => {
  const matched = content.match(regex)

  if (matched === null) return null

  return regex.exec(matched[0])
}

export const replaceCommentBody = (comment: string, newContent: string): string => {
  const matched = comment.match(COMMENT_BODY)

  if (matched === null) return comment

  return comment.replace(matched[0], `-->\n${newContent}\n<!--`)
}

export const graceFullFileNotExist = (file: string, message = '') => {
  if (!existsSync(file)) {
    console.log('\x1b[31m%s\x1b[0m', `\nFile not found:  ${file} does not exist.`)
    message && console.log('\x1b[31m%s\x1b[0m', `\n  ${message}`)
    exit(1)
  }
}
