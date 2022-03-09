import parseArgsAndGiveListOfFiles from '../src/parser/arguments'
import config from '../src/config'

describe('parseArgsAndGiveListOfFiles function', () => {
  it('shows the help text when asked for help', () => {
    expect(parseArgsAndGiveListOfFiles(['--help'])).toEqual([])
    expect(parseArgsAndGiveListOfFiles(['-h'])).toEqual([])
  })
  it('Changes the configuration', () => {
    parseArgsAndGiveListOfFiles(['-v'])
    expect(config.verbose).toBe(true)

    parseArgsAndGiveListOfFiles(['-s'])
    expect(config.silent).toBe(true)

    parseArgsAndGiveListOfFiles(['-e'])
    expect(config.error).toBe(false)

    parseArgsAndGiveListOfFiles(['-v', '-s', '-e'])
    expect(config.verbose).toBe(true)
    expect(config.silent).toBe(true)
    expect(config.error).toBe(false)

    parseArgsAndGiveListOfFiles(['--verbose', '--silent', '--error'])
    expect(config.verbose).toBe(true)
    expect(config.silent).toBe(true)
    expect(config.error).toBe(false)
  })
  it('Returns the list of files passed as cli arguments', () => {
    const files = parseArgsAndGiveListOfFiles(['-v', 'Hello.md', 'World.md'])
    expect(files).toEqual(['Hello.md', 'World.md'])
  })
  it('throws an error when an unknow argument is passed', () => {
    const spy = jest.spyOn(console, 'error')
    parseArgsAndGiveListOfFiles(['-x'])
    expect(spy).toBeCalled()
  })
})
