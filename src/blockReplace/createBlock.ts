import log from '../colorLogger'

export const getReplacedBlock = (type: string, ext: string, content: string): string => {
  log.blue(`\n${type} found`)
  switch (type) {
    case 'CODE_SNIPPET':
      log.blue(`for a ${ext} file`)
      if (ext === 'json') return '```' + ext + '\n' + JSON.stringify(JSON.parse(content), null, 4) + '\n```'
      return '```' + ext + '\n' + content.trim() + '\n```'
    default:
      return content
  }
}
