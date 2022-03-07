/**
 * Given a string that represents a path to a value in a JSON object, return the value at that path
 * @param {string} str - The string to search for.
 * @param jsonData - The JSON data to search through.
 * @returns The value of the key in the JSON object.
 */

export const getJSONFromStringPath = (str: string, jsonData: Record<string, unknown>): unknown => {
  if (str === '' || str === undefined) return jsonData
  /* This is checking if the array index comes before the dot. */
  const ArrayComesFirst = str.indexOf('[') > 0 && str.indexOf('.') > 0 && str.indexOf('[') < str.indexOf('.')

  if (!ArrayComesFirst && str.includes('.')) {
    const keys = str.split('.')
    const localJsonData = jsonData[keys[0]] as Record<string, unknown>

    return getJSONFromStringPath(keys.slice(1).join('.'), localJsonData)
  }
  if (str.includes('[')) {
    const index = parseInt(str.split('[')[1].split(']')[0])
    const localArrayData = jsonData[str.split('[')[0]] as unknown[]

    if (typeof localArrayData[index] === 'object') {
      return getJSONFromStringPath(str.split('.').slice(1).join('.'), localArrayData[index] as Record<string, unknown>)
    }

    return localArrayData[index]
  }

  return jsonData[str]
}
