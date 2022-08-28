import { GENERATED_USING } from "../constants.js"
import { ObjWithValues } from "../types.js"
import { generateEscapedValue } from "../utils/generateEscapedValue.js"

interface generateCppParams extends ObjWithValues {
    isString: boolean
}

export function generateCpp({ isString, values }: generateCppParams) {
    return `
// ${GENERATED_USING}

${isString ? "#include <string>" : ""}

namespace generated {\n
${values.reduce((prev, curr) => {
    return (prev += `\t${isString ? "std::string" : "char"} ${curr.key}${
        !isString ? "[]" : ""
    } = "${generateEscapedValue(curr.value)}";\n`)
}, "")}
}`
}
