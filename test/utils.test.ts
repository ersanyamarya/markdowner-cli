import { join } from 'path'
import { getFileDataAndDir, gracefulFileNotExist } from '../src/utils'

describe('gracefulFileNotExist function', () => {
  it('should print a red error message if the file does not exist', () => {
    const file = join(__dirname, './test.txt')
    const message = 'This is a test message'
    const spy = jest.spyOn(console, 'log')
    gracefulFileNotExist(file, message)
    expect(spy).toHaveBeenCalledWith('\x1b[31m%s\x1b[0m', `\nFile not found:  ${file} does not exist.`)
    expect(spy).toHaveBeenCalledWith('\x1b[31m%s\x1b[0m', `\n  ${message}`)
  })
})

describe('getFileDataAndDir function', () => {
  const testData = [
    {
      fileName: join(__dirname, './assets/testFile.txt'),
      expected: {
        dir: '/Users/sanyam/workspace/openSource/markdowner-cli/test/assets',
        content: 'test data',
      },
    },
  ]

  testData.forEach(({ fileName, expected }) => {
    it(`should return dir and content for ${fileName}`, () => {
      expect(getFileDataAndDir(fileName)).toEqual(expected)
    })
  })

  it('should print a red error message if the file does not exist', () => {
    const file = join(__dirname, './test.txt')
    const message = 'This is a test message'
    const spy = jest.spyOn(console, 'log')
    gracefulFileNotExist(file, message)
    expect(spy).toHaveBeenCalledWith('\x1b[31m%s\x1b[0m', `\nFile not found:  ${file} does not exist.`)
    expect(spy).toHaveBeenCalledWith('\x1b[31m%s\x1b[0m', `\n  ${message}`)
  })
})
