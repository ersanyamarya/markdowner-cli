#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import config from './config'
import identifyAndReplaceComments from './idAndReplace'
import parseArgsAndGiveListOfFiles from './parser/arguments'
import { getFileDataAndDir, log } from './utils'
console.clear()
const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
!config.silent && log.cyan(logo)
!config.silent && log.bgGray(`\nVersion: ${version}`)

const files = parseArgsAndGiveListOfFiles([...new Set(process.argv.slice(2))])

config.error && !files.length && log.red('No files passed as arguments')
files.forEach(file => {
  !config.silent && log.green(`\nProcessing file: ${file}`)
  const content = identifyAndReplaceComments(getFileDataAndDir(file))
  !config.silent && log.blue(`\n> Writing file: ${file}`)
  writeFileSync(file, content)
  !config.silent && log.green(`\nDone!`)
})
