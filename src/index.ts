#!/usr/bin/env node

import clear from 'console'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { replaceComment } from './blockReplace'
import log from './colorLogger'
import { graceFullFileNotExist } from './utils'
clear.clear()

const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
log.cyan(logo)
log.bgGray(`\nVersion: ${version}`)
log.white('\nStarting to replace blocks...')

const args = process.argv.slice(2)
const regex =
  /<!-- \[(?<type>[^ ]*)\]\((?<replacer>[^ ]*)\.(?<ext>[^ ]*)\) -->(?<body>[^ ]*)<!-- \[\/(?<typeClose>[^ ]*)\] -->/g
switch (args[0]) {
  case '-h' || '--help':
    log.yellow('\nUsage:')
    log.yellow('\n  node index.js [options]')
    log.yellow('\nOptions:')
    log.yellow('\n  -h, --help')
    log.yellow('\n    Show this help message.')
    break
  case '-v' || '--version':
    log.bgGray(`\n Version: ${version}`)
    break
  default:
    if (args.length === 0) {
      log.yellow('\n No files specified.')
      log.yellow('\n Using default file: README.md')
      args.push('./README.md')
    }

    log.white(`\nFiles to transform:`)

    for (const file of args) {
      log.white(`${file}`)
      const { content, dir } = getFileDataAndDir(file)
      const newContent = replaceComment(content, dir, regex)
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
