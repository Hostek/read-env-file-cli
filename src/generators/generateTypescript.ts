import { generateEscapedValue } from "../utils/generateEscapedValue.js"
import { GENERATED_USING } from "../constants.js"
import { ObjWithValues } from "../types.js"

export function generateTypescript({ values }: ObjWithValues) {
    return `
// ${GENERATED_USING}

export const generated_env = {
    ${values.reduce((prev, curr) => {
        return (prev += `\n\t${curr.key}: "${generateEscapedValue(
            curr.value
        )}",`)
    }, "")}\n
}
    `
}
