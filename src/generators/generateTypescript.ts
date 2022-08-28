import { ObjWithValues } from "../types.js"
import { generateJavascript } from "./generateJavascript.js"

export function generateTypescript({ values }: ObjWithValues) {
    return generateJavascript({ values, module: "ES6 modules" })
}
