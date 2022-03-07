import { readFileSync, write, writeFileSync } from 'fs'
import { join } from 'path'
import identifyAndReplaceComments from '../src/idAndReplace'
import { getFileDataAndDir } from '../src/utils'

describe('identifyAndReplaceComments function', () => {
  const testFile = join(__dirname, './assets/test.md')
  const resultFile = join(__dirname, './assets/result.md')
  const data = identifyAndReplaceComments(getFileDataAndDir(testFile))
  // console.log(data)

  // writeFileSync(resultFile, data)

  it('should replace the comments', () => {
    expect(readFileSync(resultFile, 'utf-8')).toEqual(data)
  })
})
