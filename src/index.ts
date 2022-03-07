#!/usr/bin/env node

import { readFileSync } from 'fs'
import { join } from 'path'
import parseComment from './parser'
import { getFileDataAndDir, log, MARKDOWNER_COMMENT_REGEX } from './utils'

console.clear()
const { version } = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

const logo = readFileSync(join(__dirname, '../appLogo.txt'), 'utf8')
log.cyan(logo)
log.bgGray(`\nVersion: ${version}`)

const args = process.argv.slice(2)
const defaultFile = `./test.md`

const { content, dir } = getFileDataAndDir(defaultFile)

const matched = content.match(MARKDOWNER_COMMENT_REGEX)

if (matched !== null) {
  log.blue(`\n> Found ${matched.length} comments\n`)
  log.white(matched)
  for (const comment of matched) {
    const commentName = comment.split('\n')[0]
    log.blue(`\n> Replacing ${commentName}`)
    try {
      log.white(parseComment(comment, dir))
    } catch (err) {
      log.red(`error parsing ${commentName} : ${err}`)
    }
  }
} else {
  log.red(`\n> No comments found\n`)
}

// <!-- MD[UNKNOWN](test/snippets/js/test.js)[all] -->

// <!-- MD[/UNKNOWN] -->

// <!-- MD[MAKEFILE](MAKEFILE.mk)[all] -->

// <!-- MD[/MAKEFILE] -->

// <!-- MD[JSON](package.json)[name,] -->

// <!-- MD[/JSON] -->

// <!-- MD[JSON](package.json)[name,author] -->

// <!-- MD[/JSON] -->
