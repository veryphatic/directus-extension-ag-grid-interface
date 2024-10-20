import { isValidJSON } from './is-valid-json';
import { parseJSON } from './parse-json';

/**
 * Get a JSON stringified version of a value based on its type or if it should be treated like an object
 * 
 * source: https://github.com/directus/directus/blob/75080fa20b8a5dd27964862fd163fa8c275e11b9/app/src/utils/get-stringified-value.ts
 *
 * @param value - Value to be JSON stringified
 * @param isObjectLike - Should the value be treated like an object
 * @returns - JSON stringified value or a plain string
 */
export function getStringifiedValue(
	value: string | object | number | boolean | unknown | undefined,
	isObjectLike: boolean,
): string {
	if (!value) return '';

	if (isObjectLike || typeof value === 'object') {
		// If the value is a string and is a valid JSON, parse it first to avoid unnecessary double escaped quotation marks
		const valueToStringify = typeof value === 'string' && isValidJSON(String(value)) ? parseJSON(String(value)) : value;
		return JSON.stringify(valueToStringify, null, 4);
	}

	return String(value);
}
