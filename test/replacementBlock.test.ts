import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import parseComment from '../src/parser'

describe('getReplacementBlock function', () => {
  let testData = readdirSync(join(__dirname, './assets/snippets')).map(ext => {
    return {
      content: `<!-- MD[CODE_SNIPPET](assets/snippets/${ext}/test.${ext})[] -->\n<!-- MD[/CODE_SNIPPET] -->`,
      expected: `<!-- MD[CODE_SNIPPET](assets/snippets/${ext}/test.${ext})[] -->\n${readFileSync(
        join(__dirname, `./assets/snippets/${ext}/test.md`),
        'utf8'
      )}\n<!-- MD[/CODE_SNIPPET] -->`,
      ext,
    }
  })
  testData = [
    ...testData,
    {
      content: `<!-- MD[MAKEFILE](assets/MAKEFILE.mk)[] -->\n<!-- MD[/MAKEFILE] -->
`,
      expected:
        '<!-- MD[MAKEFILE](assets/MAKEFILE.mk)[] -->\n' +
        '```sh\n' +
        'all_files_and_dir:\n' +
        '	ls -la\n' +
        '.phony: run_image\n' +
        '\n' +
        'run_image:\n' +
        '	docker run -p 5000:80 --rm \\\n' +
        '	--name $(MODULE_NAME) \\\n' +
        '	--env-file=./config.env $(ACCOUNT_NAME)/$(MODULE_NAME):$(VERSION_TAG)\n' +
        '.phony: run_image\n' +
        '```\n' +
        '<!-- MD[/MAKEFILE] -->\n',
      ext: 'mk',
    },
    {
      content: `<!-- MD[MAKEFILE](assets/MAKEFILE.mk)[run_image,] -->\n<!-- MD[/MAKEFILE] -->`,
      expected:
        '<!-- MD[MAKEFILE](assets/MAKEFILE.mk)[run_image,] -->\n' +
        '```sh\n' +
        '	docker run -p 5000:80 --rm \\\n' +
        '	--name $(MODULE_NAME) \\\n' +
        '	--env-file=./config.env $(ACCOUNT_NAME)/$(MODULE_NAME):$(VERSION_TAG)\n' +
        '```\n' +
        '<!-- MD[/MAKEFILE] -->',
      ext: 'mk',
    },
  ]
  testData.forEach(({ content, expected, ext }) => {
    it(`should return the correct replacement block for ${ext}`, () => {
      console.log({ content: parseComment(content, __dirname), expected })

      expect(parseComment(content, __dirname)).toStrictEqual(expected)
    })
  })
})
