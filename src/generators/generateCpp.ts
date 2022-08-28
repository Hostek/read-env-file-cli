import { PROJECT_URL } from "../constants"
import { generateEscapedValue } from "../utils/generateEscapedValue"

interface generateCppParams {
    isString: boolean
    values: {
        key: string
        value: string
    }[]
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
