import { parseJSON } from './parse-json.js';

// source https://github.com/directus/directus/blob/75080fa20b8a5dd27964862fd163fa8c275e11b9/packages/utils/shared/is-valid-json.ts

export function isValidJSON(input: string) {
	try {
		parseJSON(input);
		return true;
	} catch {
		return false;
	}
}
