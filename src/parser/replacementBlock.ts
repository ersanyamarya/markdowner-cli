import { findJSONFromStringDotKeys, log, readLinesFromContent } from '../utils'
import { parseOptions } from './options'

/**
 * It takes a file content and a replacement file content and returns a replacement block.
 * @param {string} type - The type of replacement block.
 * @param {string} ext - extension of the file
 * @param {string} option - option for the replacement block
 * @param {string} replaceMentFileContent - The content of the file that is being replaced
 * @returns The content for the replacement.
 */
export const getReplacementBlock = (type: string, ext: string, option: string, replaceMentFileContent: string) => {
  const parsedOptions = parseOptions(option)

  switch (type) {
    case 'CODE_SNIPPET':
      if (ext === 'json') {
        let parsedJson = JSON.parse(replaceMentFileContent)
        if (parsedOptions && parsedOptions.type === 'CSV') {
          const values: Record<string, unknown> = {}
          for (const value of parsedOptions.values) {
            values[value] = findJSONFromStringDotKeys(value.toString(), parsedJson)
          }
          parsedJson = values
        }
        replaceMentFileContent = JSON.stringify(parsedJson, null, 4)
      }
      if (parsedOptions && parsedOptions.type === 'START_STOP') {
        replaceMentFileContent = readLinesFromContent(replaceMentFileContent, parsedOptions.values as number[])
      }
      return '```' + ext + '\n' + replaceMentFileContent.trim() + '\n```'

    case 'JSON':
      if (ext !== 'json') log.red(`> ${type} is only supported for json files`)
      else {
        let parsedJson = JSON.parse(replaceMentFileContent)
        if (parsedOptions && parsedOptions.type === 'CSV') {
          if (parsedOptions.values.length === 1)
            parsedJson = findJSONFromStringDotKeys(parsedOptions.values[0].toString(), parsedJson)
          else {
            const values: Record<string, unknown> = {}
            for (const value of parsedOptions.values) {
              values[value] = findJSONFromStringDotKeys(value.toString(), parsedJson)
            }
            parsedJson = values
          }
        }
        replaceMentFileContent = JSON.stringify(parsedJson, null, 4)
      }
      return replaceMentFileContent

    default:
      return replaceMentFileContent.trim()
  }
}
