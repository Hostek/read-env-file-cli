#!/usr/bin/env node

import fs from "fs"
import inquirer from "inquirer"
import path from "path"
import {
    Cpp_data_choices,
    JS_module_choices,
    lang_choices,
} from "./constants.js"
import { generateCpp } from "./generators/generateCpp.js"
import { generateJavascript } from "./generators/generateJavascript.js"
import { generateJSON } from "./generators/generateJSON.js"
import { generatePython } from "./generators/generatePython.js"
import { generateTypescript } from "./generators/generateTypescript.js"
import { valuesType } from "./types.js"

const answers = await inquirer.prompt([
    {
        name: "env_dir",
        type: "input",
        message: "Absolute path to .env file: ",
    },
    {
        name: "type",
        type: "list",
        message: "What should be generated?",
        choices: lang_choices,
    },
    {
        name: "example",
        type: "list",
        message: "Create .env.example file?",
        choices: ["yes", "no"],
    },
    {
        name: "name",
        type: "list",
        message: "Choose a name for generated file: ",
        choices: ["default", "custom"],
    },
])

const env_dir: string = answers.env_dir
const type: typeof lang_choices[number] = answers.type
const create_example = answers.example === "yes"
const chooseCustomName = answers.name === "custom"

let file = fs.readFileSync(env_dir, { encoding: "utf-8" })

file = file.replaceAll("\r", "")

const each_line = file.split("\n")

const values: valuesType = each_line.map((line) => {
    const [key, value] = line.split("=", 2)
    if (
        // check if key starts with a number (digit)
        key.match(/^\d/) ||
        key.includes("-") ||
        key.includes("+") ||
        key.includes("\\") ||
        key.includes("\n") ||
        key.includes(" ") ||
        key.length > 255
    ) {
        console.warn(`Key \`${key}\` may not work with every language!`)
    }
    return { key, value }
})

const root_path = path.join(env_dir, "..")

if (create_example) {
    const data = values.reduce((prev, curr) => {
        return (prev += `${curr.key}=\n`)
    }, "")

    fs.writeFileSync(path.join(root_path, "./.env.example"), data)
}

let filename = ""

if (chooseCustomName) {
    const answer = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Type custom file name: ",
    })

    filename = answer.name
} else {
    const date = Date.now()

    filename = `generated-${date.toString()}`
}

let data = ""

if (type === "c++") {
    if (!filename.includes(".")) {
        filename += ".cpp"
    }

    const answer = await inquirer.prompt({
        name: "data_type",
        type: "list",
        message: "I should use: ",
        choices: Cpp_data_choices,
    })

    const data_type: typeof Cpp_data_choices[number] = answer.data_type

    const isString = data_type === "std::string"

    data = generateCpp({ isString, values })
} else if (type === "typescript") {
    if (!filename.includes(".")) {
        filename += ".ts"
    }

    data = generateTypescript({ values })
} else if (type === "javascript") {
    if (!filename.includes(".")) {
        filename += ".js"
    }

    const answer = await inquirer.prompt({
        name: "answerik",
        type: "list",
        message: "I should use: ",
        choices: JS_module_choices,
    })

    const answerik: typeof JS_module_choices[number] = answer.answerik

    data = generateJavascript({ values, module: answerik })
} else if (type === "JSON") {
    if (!filename.includes(".")) {
        filename += ".json"
    }

    data = generateJSON({ values })
} else if (type === "python") {
    if (!filename.includes(".")) {
        filename += ".py"
    }

    data = generatePython({ values })
}

fs.writeFileSync(path.join(root_path, filename), data)

console.log(`File saved as: ${filename}`)
