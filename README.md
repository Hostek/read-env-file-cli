# read-env-file-cli

CLI that generates types for different languages based on .env file

## Requirements

```
NodeJS >= 15.0.0
```

## Install

using npm: `npm i -g @hostek123/read-env-file`

using yarn: `yarn global add @hostek123/read-env-file`

## How to use

Just type in terminal: `read-env-file`

And that is it!

## What it does

It creates file containing information from your .env file

For example let's say I have this `./env` file:

```
test=Hello
test1=World!
```

When I run `read-env-file` it will create generated file in the chosen language

If I chose c++ it would create following file:

```C++
#include <string>

namespace generated {
	std::string test = "Hello";
	std::string test1 = "World!";
}
```

It would also create `.env.example` file:

```
test=
test1=
```

## Supported languages

-   C++
-   Javascript (commonJS and ES6 modules)
-   Typescript
-   JSON
-   Python
