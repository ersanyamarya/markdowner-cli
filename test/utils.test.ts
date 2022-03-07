import { readFileSync } from 'fs'
import { join } from 'path'
import { replaceCommentBody, readLinesFromContent } from '../src/utils'

describe('replaceCommentBody function', () => {
  const testData = [
    {
      comment: '<!-- MD[UNKNOWN](test/snippets/js/test.js)[all] -->\n<!-- MD[/UNKNOWN] -->',
      content: 'test',
      expected: '<!-- MD[UNKNOWN](test/snippets/js/test.js)[all] -->\ntest\n<!-- MD[/UNKNOWN] -->',
    },
  ]
  testData.forEach(({ comment, content, expected }) => {
    it(`should replace the comment body with ${content}`, () => {
      expect(replaceCommentBody(comment, content)).toEqual(expected)
    })
  })
})

describe('readLinesFromContent function', () => {
  const testData = [
    {
      content: readFileSync(join(__dirname, './assets/testFile.txt'), 'utf8'),
      lines: [1, 3],
      expected: `Sint veniam proident deserunt laboris tempor eiusmod commodo Lorem amet elit est ut consequat.
Enim ea excepteur cillum irure culpa laborum anim pariatur nulla Lorem.
Laborum non cillum laborum excepteur occaecat aliquip occaecat ipsum irure in reprehenderit sunt proident.`,
    },
  ]
  testData.forEach(({ content, lines, expected }) => {
    it(`should return the lines ${lines} from ${content}`, () => {
      expect(readLinesFromContent(content, lines)).toEqual(expected)
    })
  })
})
