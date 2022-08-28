import { generateEscapedValue } from "../utils/generateEscapedValue.js"
import { GENERATED_USING } from "../constants.js"
import { JS_module_types, ObjWithValues } from "../types.js"

interface generateJavascriptParam extends ObjWithValues {
    module: JS_module_types
}

export function generateJavascript({
    values,
    module,
}: generateJavascriptParam) {
    const generatedObject = `const generated_env = {
${values.reduce((prev, curr) => {
    return (prev += `\n\t${curr.key}: "${generateEscapedValue(curr.value)}",`)
}, "")}\n
}`

    if (module === "ES6 modules") {
        return `
// ${GENERATED_USING}
    
export ${generatedObject}`
    } else if (module === "commonJS") {
        return `
// ${GENERATED_USING}

${generatedObject}

module.exports = {
    generated_env
}`
    } else {
        return ""
    }
}
