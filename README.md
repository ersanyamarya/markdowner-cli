![logo](assets/logo.png)

# markdowner-cli

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7dd42730c82e41bb94e534a54415eecc)](https://app.codacy.com/gh/ersanyamarya/markdowner-cli?utm_source=github.com&utm_medium=referral&utm_content=ersanyamarya/markdowner-cli&utm_campaign=Badge_Grade_Settings)

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
