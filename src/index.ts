#!/usr/bin/env node

import { readFileSync } from 'fs'
import { join } from 'path'
import identifyAndReplaceComments from './idAndReplace'
import { getFileDataAndDir, log } from './utils'
import { silent, verbose } from './config'
console.clear()
const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
!silent && log.cyan(logo)
!silent && log.bgGray(`\nVersion: ${version}`)

const args = process.argv.slice(2)
const defaultFile = `./test.md`

const content = identifyAndReplaceComments(getFileDataAndDir(defaultFile))

verbose && log.cyan(`\n${content}`)
