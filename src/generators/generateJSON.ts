import { generateEscapedValue } from "../utils/generateEscapedValue.js"
import { ObjWithValues } from "../types.js"

export function generateJSON({ values }: ObjWithValues) {
    return `
{
    ${values.reduce((prev, curr, i) => {
        return (prev += `\n\t"${generateEscapedValue(
            curr.key
        )}": "${generateEscapedValue(curr.value)}"${
            i !== values.length - 1 ? "," : ""
        }`)
    }, "")}\n
}`
}
