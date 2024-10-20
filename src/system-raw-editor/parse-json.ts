/**
 * Run JSON.parse, but ignore `__proto__` properties. This prevents prototype pollution attacks
 * source https://github.com/directus/directus/blob/75080fa20b8a5dd27964862fd163fa8c275e11b9/packages/utils/shared/parse-json.ts
 */
export function parseJSON(input: string): any {
	if (String(input).includes('__proto__')) {
		return JSON.parse(input, noproto);
	}

	return JSON.parse(input);
}

export function noproto<T>(key: string, value: T): T | void {
	if (key !== '__proto__') {
		return value;
	}
}
