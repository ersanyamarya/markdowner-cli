#!/usr/bin/env node

import clear from 'console'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { replaceComment } from './blockReplace'
import log from './colorLogger'
import { REPLACER_REGEXP } from './regExp'
import { graceFullFileNotExist } from './utils'
clear.clear()

const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
log.cyan(logo)
log.bgGray(`\nVersion: ${version}`)

const args = process.argv.slice(2)
const defaultFile = `./README.md`

switch (args[0]) {
  case '-h' || '--help':
    log.yellow('\nUsage:')
    log.yellow('\n  markdowner [filepath]')
    log.yellow('\nOptions:')
    log.yellow('\n  -h, --help')
    log.yellow('\n    Show this help message.')
    break
  case '-v' || '--version':
    log.bgGray(`\n Version: ${version}`)
    break
  default:
    log.white('\nStarting to replace blocks...')
    if (args.length === 0) {
      log.yellow('\n No files specified.')
      log.yellow(`\n Using default file: ${defaultFile}`)
      args.push(defaultFile)
    }

    log.white(`\nFiles to transform:`)

    for (const file of args) {
      log.white(`${file}`)
      const { content, dir } = getFileDataAndDir(file)
      const newContent = replaceComment(content, dir, REPLACER_REGEXP)
      log.white(`\nWriting to ${file}...`)
      writeFileSync(file, newContent)
      log.white('\nDone writing to file!')
    }

    break
}

function getFileDataAndDir(file: string) {
  graceFullFileNotExist(file)
  return {
    content: readFileSync(file, 'utf8'),
    dir: dirname(file),
  }
}
