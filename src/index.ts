#!/usr/bin/env node

import inquirer from "inquirer"
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
