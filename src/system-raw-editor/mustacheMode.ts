// source https://github.com/directus/directus/blob/75080fa20b8a5dd27964862fd163fa8c275e11b9/app/src/interfaces/_system/system-raw-editor/mustacheMode.ts
export const mustacheMode = {
	start: [{ regex: /\{\{/, push: 'mustache', token: 'tag' }],
	mustache: [
		{ regex: /\}\}/, pop: true, token: 'tag' },

		// Double and single quotes
		{ regex: /"(?:[^\\"]|\\.)*"?/, token: 'string' },
		{ regex: /'(?:[^\\']|\\.)*'?/, token: 'string' },

		// Flows variables keywords
		{ regex: />|[$/]([A-Za-z0-9_-]\w*)/, token: 'keyword' },

		// Numeral
		{ regex: /\d+/i, token: 'number' },

		// Paths
		{ regex: /(?:\.\.\/)*(?:[A-Za-z_][\w.]*)+/, token: 'variable-2' },
	],
};
