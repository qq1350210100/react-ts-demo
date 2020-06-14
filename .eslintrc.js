module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		// "eslint:recommended",
		'plugin:react/recommended'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	plugins: ['prettier', 'react', 'react-hooks'],
	rules: {
		'react/display-name': 'off',
		'react/prop-types': 0,
		'react-hooks/rules-of-hooks': 'error',
		quotes: ['warn', 'single'],
		semi: ['warn', 'never'],
		strict: 0
	},
	parser: 'babel-eslint'
}
