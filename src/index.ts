#!/usr/bin/env node

import { readFileSync } from 'fs'
import { join } from 'path'
import identifyAndReplaceComments from './idAndReplace'
import { getFileDataAndDir, log } from './utils'

console.clear()
const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
log.cyan(logo)
log.bgGray(`\nVersion: ${version}`)

const args = process.argv.slice(2)
const defaultFile = `./test.md`

const content = identifyAndReplaceComments(getFileDataAndDir(defaultFile))

log.cyan(`\n${content}`)
