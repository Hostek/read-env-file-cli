export type supported_langs = "c++" | "typescript" | "javascript"

export type Cpp_data_types = "char[]" | "std::string"

export type valuesType = {
    key: string
    value: string
}[]

export interface ObjWithValues {
    values: valuesType
}

export type JS_module_types = "commonJS" | "ES6 modules"
