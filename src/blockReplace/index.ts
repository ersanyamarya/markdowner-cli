import { readFileSync } from 'fs'
import { join } from 'path'
import log from '../colorLogger'
import { getMatchedContent, graceFullFileNotExist } from '../utils'
import { getReplacedBlock } from './createBlock'

export const replaceCommentBody = (comment: string, newContent: string): string => {
  const regex = /\n[^ ]*\n/g
  const matched = comment.match(regex)

  if (matched === null) return comment

  return comment.replace(matched[0], `\n${newContent}\n`)
}

interface RegexGroup {
  type: string
  ext: string
  replacer: string
}

export const getNewBlock = (comment: string, mdFileDir: string, regex: RegExp): string => {
  if (regex.exec(comment)?.groups === null) return comment

  const { type, replacer, ext } = getMatchedContent(regex, comment)?.groups as unknown as RegexGroup

  const replaceContentFile = join(mdFileDir, `${replacer}.${ext}`)
  graceFullFileNotExist(replaceContentFile, comment)
  const replaceContent = readFileSync(replaceContentFile, 'utf8')
  log.blue('--------------------------------')
  log.yellow('> Replacing')
  log.white(comment.split('\n')[0])
  log.blue(`with ${replaceContentFile}`)
  return replaceCommentBody(comment, getReplacedBlock(type, ext, replaceContent))
}

export const replaceComment = (content: string, mdFileDir: string, regex: RegExp): string => {
  const matched = content.match(regex)

  let newContent = content

  if (matched !== null) {
    log.green(`\nFound ${matched.length} comments\n`)
    for (const comment of matched) newContent = newContent.replace(comment, getNewBlock(comment, mdFileDir, regex))
  }
  log.yellow('\n> Done\n')
  return newContent
}

export { getReplacedBlock }
