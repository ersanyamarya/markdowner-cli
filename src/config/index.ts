import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
const confFile = join(__dirname, './config.json')

interface Config {
  verbose: boolean
  error: boolean
  silent: boolean
}

const readConfFile = (): Config => JSON.parse(readFileSync(confFile, 'utf8'))
const writeConfFile = (data: Config) => writeFileSync(confFile, JSON.stringify(data, null, 4))

export const setVerbose = () => {
  const configurations = readConfFile()
  configurations.verbose = true
  writeConfFile(configurations)
}

export const setSilent = () => {
  const configurations = readConfFile()
  configurations.silent = true
  writeConfFile(configurations)
}

export const setError = () => {
  const configurations = readConfFile()
  configurations.error = true
  writeConfFile(configurations)
}

export const verbose = readConfFile().verbose
export const silent = readConfFile().silent
export const error = readConfFile().error
