#!/usr/bin/env node

import fs from "fs"
import inquirer from "inquirer"
import path from "path"
import { supported_langs } from "./types"

const lang_choices: supported_langs[] = ["cpp", "typescript"]

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
])

const env_dir: string = answers.env_dir
const type: typeof lang_choices[number] = answers.type
const create_example = answers.example === "yes"

let file = fs.readFileSync(env_dir, { encoding: "utf-8" })

file = file.replaceAll("\r", "")

const each_line = file.split("\n")

const values = each_line.map((line) => {
    const [key, value] = line.split("=", 1)
    return { key, value }
})

if (type === "cpp") {
} else if (type === "typescript") {
}
