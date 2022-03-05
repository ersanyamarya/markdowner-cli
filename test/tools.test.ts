import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { getNewBlock, getReplacedBlock, replaceComment } from '../src/blockReplace'

describe('getReplacedBlock function ', () => {
  const testData = readdirSync(join(__dirname, 'snippets')).map(ext => ({
    type: 'CODE_SNIPPET',
    ext,
    content: readFileSync(join(__dirname, `snippets/${ext}/test.${ext}`), 'utf8'),
    expected: readFileSync(join(__dirname, `snippets/${ext}/test.md`), 'utf8'),
  }))

  for (const key of testData) {
    const result = getReplacedBlock(key.type, key.ext, key.content)

    it(`Returns the correct structure for ${key.ext}`, () => {
      expect(result).toBe(key.expected)
    })
  }
})

describe('getNewBlock function', () => {
  const comments = readdirSync(join(__dirname, 'snippets')).map(ext => ({
    content: `<!-- [CODE_SNIPPET](snippets/${ext}/test.${ext}) -->\n\n<!-- [/CODE_SNIPPET] -->`,
    expected:
      `<!-- [CODE_SNIPPET](snippets/${ext}/test.${ext}) -->\n` +
      readFileSync(join(__dirname, `snippets/${ext}/test.md`), 'utf8') +
      '\n<!-- [/CODE_SNIPPET] -->',
  }))
  const regex =
    /<!-- \[(?<type>[^ ]*)\]\((?<replacer>[^ ]*)\.(?<ext>[^ ]*)\) -->(?<body>[^ ]*)<!-- \[\/(?<typeClose>[^ ]*)\] -->/g

  for (const comment of comments) {
    const result = getNewBlock(comment.content, __dirname, regex)

    it(`Returns the correct structure for ${comment.content}`, () => {
      expect(result).toBe(comment.expected)
    })
  }
})

describe('replaceComment function', () => {
  const testData = readFileSync(join(__dirname, 'test.md'), 'utf8')
  const resultData = readFileSync(join(__dirname, 'result.md'), 'utf8')
  const regex: RegExp =
    /<!-- \[(?<type>[^ ]*)\]\((?<replacer>[^ ]*)\.(?<ext>[^ ]*)\) -->(?<body>[^ ]*)<!-- \[\/(?<typeClose>[^ ]*)\] -->/g

  const result = replaceComment(testData, __dirname, regex)

  it('Returns the correct structure for test.md', () => {
    expect(result).toBe(resultData)
  })
})
