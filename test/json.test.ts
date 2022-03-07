import { getJSONFromStringPath } from '../src/utils'

describe('getJSONFromStringPath function', () => {
  const testData = [
    {
      str: 'test.test',
      jsonData: {
        test: {
          test: 'test',
        },
      },
      expected: 'test',
    },
    {
      str: 'test[0]',
      jsonData: {
        test: ['test'],
      },
      expected: 'test',
    },
    {
      str: 'alpha[0].test',
      jsonData: {
        alpha: [{ test: 'test' }],
      },
      expected: 'test',
    },
    {
      str: 'alpha[0].test[0]',
      jsonData: {
        alpha: [{ test: ['test'] }],
      },
      expected: 'test',
    },
    {
      str: 'alpha[0].test[0].test',
      jsonData: {
        alpha: [{ test: [{ test: 'test' }] }],
      },
      expected: 'test',
    },
    {
      str: 'alpha[1].data[0].data[0]',
      jsonData: {
        alpha: ['data', { data: [{ data: ['test'] }] }],
      },
      expected: 'test',
    },
    {
      str: 'alpha[1].data[0].data[0].test',
      jsonData: {
        alpha: ['data', { data: [{ data: [{ test: 'test' }] }] }],
      },
      expected: 'test',
    },
  ]

  testData.forEach(({ str, jsonData, expected }) => {
    it(`should return the value of ${str} in ${JSON.stringify(jsonData)}`, () => {
      expect(getJSONFromStringPath(str, jsonData)).toEqual(expected)
    })
  })
})
