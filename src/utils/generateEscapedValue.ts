export function generateEscapedValue(value: string) {
    return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')
}
