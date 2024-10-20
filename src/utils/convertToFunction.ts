export function convertToFunction(funcStr: string): Function {
    return new Function("return " + funcStr)();
}