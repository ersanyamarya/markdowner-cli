/**
 * It takes a string and returns a type and values if it's a valid option
 * @param {string} option - string
 * @returns An object with a type and values.
 */
export const parseOptions = (
  option: string
): {
  type: string
  values: string[] | number[]
} | null => {
  const OPTIONS = {
    START_END: /^\d+:\d+$/g,
    CSV: /[^ ]*,[^ ]*/g,
  }
  if (!option || option.trim() === '' || option.trim() === 'null') return null
  if (OPTIONS.START_END.test(option)) return { type: 'START_END', values: option.split(':').map(a => parseInt(a)) }
  if (OPTIONS.CSV.test(option))
    return {
      type: 'CSV',
      values: option.split(',').reduce((acc: string[], cur) => {
        if (cur.trim() !== '') acc.push(cur.trim())
        return acc
      }, []),
    }
  else return null
}
