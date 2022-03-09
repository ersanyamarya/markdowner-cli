import { configuration } from '../config'
import { log } from '../utils'

const parseArgsAndGiveListOfFiles = (args: string[]): string[] => {
  const files: string[] = []
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const option = arg.slice(2)
      executeAction(option)
    } else if (arg.startsWith('-')) {
      const option = arg.slice(1)
      Array.from(option).forEach(opt => executeAction(opt))
    } else files.push(arg)
  })
  return files
}

export default parseArgsAndGiveListOfFiles
function executeAction(option: string) {
  if (option in configuration) configuration[option].action()
  else log.red(`Unknown option: ${option}`)
}
