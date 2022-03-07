![logo](assets/logo.png)

![Codacy grade](https://img.shields.io/codacy/grade/a68f6282624d4ac4ba8936fcfe41fdda?style=for-the-badge)

# markdowner-cli

A command-line tools crafted to make your life easier when working with markdown-based documentation.

## Features

Replaces MD comments with either generated values of content from other files.

### Replace Code blocks with syntax highlighting

**Example:**

converts:

```md
<!-- [CODE_SNIPPET](test/snippets/json/test.json) -->

<!-- [/CODE_SNIPPET] -->
```

with:

````md
<!-- [CODE_SNIPPET](test/snippets/json/test.json) -->

    ```json
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    }
    ```

<!-- [/CODE_SNIPPET] -->
````

## How to use

```sh
npm install -g markdown-cli
markdowner READE.md
```
