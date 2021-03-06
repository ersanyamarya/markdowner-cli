import log from './colorLogger'
import { COMMENT_BODY } from './regExp'
export * from './files'
export * from './regExp'
export * from './jsonUtils'
export { log }

/**
 * Return the first match of the regex in the content
 * @param {RegExp} regex - A regular expression that you want to match against the content.
 * @param {string} content - The content to be searched.
 * @returns The matched content.
 */
export const getMatchedContent = (regex: RegExp, content: string): RegExpExecArray | null => {
  const matched = content.match(regex)
  if (matched === null) return null
  return regex.exec(matched[0])
}

/**
 * Replace the body of a comment with the given content
 * @param {string} comment - The comment to replace.
 * @param {string} newContent - The new content to replace the comment with.
 * @returns The original comment with the new content in the body.
 */
export const replaceCommentBody = (comment: string, newContent: string): string => {
  const matched = comment.match(COMMENT_BODY)
  if (matched === null) return comment
  return comment.replace(matched[0], `-->\n${newContent}\n<!--`)
}

/**
 * Given a string, return a string containing the lines between the start and stop indices
 * @param {string} content - The content of the file to be read.
 * @param {number[]} startStop - An array of two numbers. The first number is the line number to start
 * at, and the second number is the line number to stop at.
 * @returns A string of the lines between the start and stop indices.
 */
export const readLinesFromContent = (content: string, startStop: number[]): string => {
  const lines = content.split('\n')
  return lines.slice(startStop[0], startStop[1] + 1).join('\n')
}
