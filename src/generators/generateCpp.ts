import { valuesType } from "../types.js"
import { PROJECT_URL } from "../constants.js"
import { generateEscapedValue } from "../utils/generateEscapedValue.js"

interface generateCppParams {
    isString: boolean
    values: valuesType
}

export function generateCpp({ isString, values }: generateCppParams) {
    return `
// generated using ${PROJECT_URL}

${isString ? "#include <string>" : ""}

namespace generated {\n
${values.reduce((prev, curr) => {
    return (prev += `\t${isString ? "std::string" : "char"} ${curr.key}${
        !isString ? "[]" : ""
    } = "${generateEscapedValue(curr.value)}";\n`)
}, "")}
}`
}
