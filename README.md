![logo](assets/logo.png)

# markdowner-cli

A CLI based tool crafted to make you your life easier while working with documentation in md file.

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
```md
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
```


## How to use

```sh
npm install -g markdown-cli
markdowner READE.md
```

