---
description: Quis enim amet duis proident esse officia et consequat anim sit elit nulla
---


<!-- MD[CODE_SNIPPET](snippets/js/test.js)[] -->
```js
const a = 10
const b = 20
const c = a + b
console.log(c)
```
<!-- MD[/CODE_SNIPPET] -->


<!-- MD[CODE_SNIPPET](snippets/json/test.json)[] -->
```json
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
    "location": {
        "lat": -37.3159,
        "lng": 81.1496
    },
    "score": [
        {
            "english": 10,
            "math": 10
        },
        {
            "english": 8,
            "math": 9
        }
    ]
}
```
<!-- MD[/CODE_SNIPPET] -->


<!-- MD[UNKNOWN](snippets/js/test.js)[] -->
const a = 10
const b = 20
const c = a + b
console.log(c)
<!-- MD[/UNKNOWN] -->

### JSON  \[CODE_SNIPPET\] find `score[1].math`

<!-- MD[CODE_SNIPPET](snippets/json/test.json)[score[1].math,] -->
```json
{
    "score[1].math": 9
}
```
<!-- MD[/CODE_SNIPPET] -->

### JSON \[CODE_SNIPPET\] find `location.lat` and `score[0].english`

<!-- MD[CODE_SNIPPET](snippets/json/test.json)[location.lat,score[0].english] -->
```json
{
    "location.lat": -37.3159,
    "score[0].english": 10
}
```
<!-- MD[/CODE_SNIPPET] -->

### JSON  \[JSON\] find `location.lat` and `score[0].english`

<!-- MD[JSON](snippets/json/test.json)[location.lat,score[0].english] -->
{
    "location.lat": -37.3159,
    "score[0].english": 10
}
<!-- MD[/JSON] -->

### JSON  \[JSON\] find  `score[0].english`

<!-- MD[JSON](snippets/json/test.json)[score[0].english,] -->
10
<!-- MD[/JSON] -->



<!-- MD[MAKEFILE](MAKEFILE.mk)[] -->
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

<!-- MD[MAKEFILE](MAKEFILE.mk)[run_image,] -->
```sh
	docker run -p 5000:80 --rm \
	--name $(MODULE_NAME) \
	--env-file=./config.env $(ACCOUNT_NAME)/$(MODULE_NAME):$(VERSION_TAG)
```
<!-- MD[/MAKEFILE] -->