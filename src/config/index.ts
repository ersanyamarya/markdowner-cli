import { exit } from 'process'
import { log } from '../utils'

const config = {
  verbose: false,
  silent: false,
  error: true,
}

interface Option {
  name: string
  short: string
  description: string
  action: () => void
}

const options: Option[] = [
  {
    name: 'verbose',
    short: 'v',
    description: 'Show verbose output',
    action: () => {
      config.verbose = true
      config.silent = true
      config.error = false
    },
  },
  {
    name: 'silent',
    short: 's',
    description: 'Dont show any output',
    action: () => {
      config.silent = true
    },
  },
  {
    name: 'error',
    short: 'e',
    description: 'Disable error output',
    action: () => {
      config.error = false
    },
  },
  {
    name: 'help',
    short: 'h',
    description: 'Show the help',
    action: () => {
      log.cyan(
        options.reduce((acc, curr: Option) => {
          acc += `\t--${curr.name}, -${curr.short}\t${curr.description}\n`
          return acc
        }, 'Help:\nmarkdowner [options] [files]\n\n')
      )
      // exit(0)
    },
  },
]
interface Configuration {
  [key: string]: {
    description: string
    action: () => void
  }
}

const configuration: Configuration = options.reduce((acc, curr: Option) => {
  acc[curr.name] = {
    description: curr.description,
    action: curr.action,
  }
  acc[curr.short] = {
    description: curr.description,
    action: curr.action,
  }
  return acc
}, {} as Configuration)

export default config
export { configuration }
