import { parseOptions } from '../src/parser/options'

describe('parseOptions function', () => {
  const testData = [
    {
      option: '1:2',
      expected: {
        type: 'START_END',
        values: [1, 2],
      },
    },
    {
      option: '1',
      expected: null,
    },
    {
      option: '1:2s',
      expected: null,
    },
    {
      option: 'one',
      expected: null,
    },
    {
      option: '1:2:3',
      expected: null,
    },
    {
      option: 'one,',
      expected: {
        type: 'CSV',
        values: ['one'],
      },
    },
    {
      option: 'one,two',
      expected: {
        type: 'CSV',
        values: ['one', 'two'],
      },
    },
    {
      option: 'one,two,three,four',
      expected: {
        type: 'CSV',
        values: ['one', 'two', 'three', 'four'],
      },
    },
  ]
  testData.forEach(({ option, expected }) => {
    it(`should parse ${option} to ${expected}`, () => {
      expect(parseOptions(option)).toEqual(expected)
    })
  })
})
