![logo](assets/logo.png)

![Codacy grade](https://img.shields.io/codacy/grade/a68f6282624d4ac4ba8936fcfe41fdda?style=for-the-badge)

# markdowner-cli

A command-line tools crafted with love ❤️ and code 💻 to make your life easier when working with markdown-based documentation.

## What can Markdowner CLI do for you ?

1.  An easy way to create documents for your code, using code 😀.
2.  Don't rewrite your code in your README/MD files anymore.
3.  Automatically generate different parts your document just by using comments, and markdowner off course 🤪.
4.  More features to be added .... 👍.

## How to use

```sh
npm install -g markdown-cli
markdowner READE.md
```

## Analogy

> Add comments as follows:

    <!-- MD[<TYPE>](<source path with extension>)[<OPTIONS>] -->

    <!-- MD[/<TYPE>] -->

### Supported Types

| Type         | Description                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| CODE_SNIPPET | Replace with content form a file with syntax highlighting and code block.                                  |
| JSON         | Get json content with desired options with path of the key/s to extract.                                   |
| MAKEFILE     | Get content from Makefile (use `.mk` extension with makefile). EIther the whole file or a set of commands. |

### We have two tpe of options

| Option    | Example                            | Description                                                 |
| --------- | ---------------------------------- | ----------------------------------------------------------- |
| START END | [1:5]                              | Start from 1st line and read up to the 5th line.            |
| CSV       | [name,version,], \[author[9].url,] | comma separated values of the entities you want to extract. |

## Features

Replaces MD comments with either generated values of content from other files.

### Replace Code blocks with syntax highlighting

#### Simply substitute content from a file to your document.

replaces:

```md
<!-- MD[CODE_SNIPPET](test/assets/snippets/js/test.js)[] -->

<!-- MD[/CODE_SNIPPET] -->
```

with:

````md
<!-- MD[CODE_SNIPPET](test/assets/snippets/js/test.js)[] -->

    ```js
    const a = 10
    const b = 20
    const c = a + b
    console.log(c)
    ```

<!-- MD[/CODE_SNIPPET] -->
````

#### When substituting form a `json` file, specify the json paths to pick data from

replaces:

replaces:

```md
<!-- MD[CODE_SNIPPET](package.json)[version,] -->

<!-- MD[/CODE_SNIPPET] -->
```

with

````md
<!-- MD[CODE_SNIPPET](package.json)[version,] -->

    ```json
    {
        "version": "1.1.0"
    }
    ```

<!-- MD[/CODE_SNIPPET] -->
````

#### When substituting from `MAKEFILE` use `.mk` extension.

replaces:

```md
<!-- MD[MAKEFILE](test/assets/MAKEFILE.mk)[] -->

<!-- MD[/MAKEFILE] -->
```

with:

````md
<!-- MD[MAKEFILE](test/assets/MAKEFILE.mk)[] -->

    ```sh
    all_files_and_dir:
        ls -la
    .phony: run_image

    run_image:
        docker run -p 5000:80 --rm \
        --name $(MODULE_NAME) \
        --env-file=./config.env $(ACCOUNT_NAME)/$(MODULE_NAME):$(VERSION_TAG)
    .phony: run_image
    ```

<!-- MD[/MAKEFILE] -->
````

#### Specify what command you want to pull form the `MAKEFILE`.

replaces:

```md
<!-- MD[MAKEFILE](test/assets/MAKEFILE.mk)[run_image,] -->

<!-- MD[/MAKEFILE] -->
```

with:

````md
<!-- MD[MAKEFILE](test/assets/MAKEFILE.mk)[run_image,] -->

    ```sh
        docker run -p 5000:80 --rm \
        --name $(MODULE_NAME) \
        --env-file=./config.env $(ACCOUNT_NAME)/$(MODULE_NAME):$(VERSION_TAG)
    ```

<!-- MD[/MAKEFILE] -->
````

### Specify line number to read from in a file

replaces:

```md
<!-- MD[CODE_SNIPPET](test/assets/testFIle.txt)[2:3] -->

<!-- MD[/CODE_SNIPPET] -->
```

with:

````md
<!-- MD[CODE_SNIPPET](test/assets/testFIle.txt)[2:3] -->

    ```txt
        Enim ea excepteur cillum irure culpa laborum anim pariatur nulla Lorem.
        Laborum non cillum laborum excepteur occaecat aliquip occaecat ipsum irure in reprehenderit sunt proident.
    ```

<!-- MD[/CODE_SNIPPET] -->
````

### Parse `json` file just ot get the data in text format not code block

replaces:

```md
version:

<!-- MD[JSON](package.json)[version,] -->

<!-- MD[/JSON] -->
```

with:

```md
version:

<!-- MD[JSON](package.json)[version,] -->

"1.0.2"

<!-- MD[/JSON] -->
```

Hope you like this. 

Developer:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sanyam-arya/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ersanyamarya)