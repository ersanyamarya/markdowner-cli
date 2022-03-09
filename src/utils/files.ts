import { existsSync, readFileSync } from 'fs'
import { dirname } from 'path'
import config from '../config'

/**
 * If the file does not exist, print a red error message
 * @param {string} file - The file that is being checked for existence.
 * @param [message] - A message to display to the user.
 */
export const gracefulFileNotExist = (file: string, message = ''): void => {
  if (!existsSync(file)) {
    config.error && console.log('\x1b[31m%s\x1b[0m', `\nFile not found:  ${file} does not exist.`)
    config.error && message && console.log('\x1b[31m%s\x1b[0m', `\n  ${message}`)
  }
}

/**
 * If the file exists, return its content and its directory
 * @param {string} file - The file to read.
 * @returns A `{ content: string, dir: string }` object.
 */
export const getFileDataAndDir = (file: string) => {
  gracefulFileNotExist(file)
  return {
    content: readFileSync(file, 'utf8'),
    dir: dirname(file),
  }
}
