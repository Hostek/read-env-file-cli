import { generateEscapedValue } from "../utils/generateEscapedValue.js"
import { ObjWithValues } from "../types.js"
import { GENERATED_USING } from "../constants.js"

export function generatePython({ values }: ObjWithValues) {
    return `
# ${GENERATED_USING}

${values.reduce((prev, curr) => {
    return (prev += `${curr.key} = "${generateEscapedValue(curr.value)}"\n`)
}, "")}\n`
}
