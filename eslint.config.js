export default [
    {
        env: {
            browser: true,
            es2021: true,
            node: true,
        },
        extends: ['eslint:recommended'],
        parserOptions: {
            ecmaVersion: 12,
            sourceType: 'module',
        },
        rules: {
            indent: ['error', 2],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': ['warn'],
            'no-console': 'off',
            eqeqeq: ['error', 'always'],
            curly: 'error',
            'comma-dangle': ['error', 'never'],
        },
    },
]
