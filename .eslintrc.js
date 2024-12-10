module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2022, // Allow modern ECMAScript features
        sourceType: 'module', // Allow ES Modules
    },
    rules: {
        'no-unused-vars': 'warn', // Highlight unused variables
        eqeqeq: 'error', // Enforce strict equality
        curly: 'error', // Always use braces for blocks
        semi: ['error', 'always'], // Require semicolons
        quotes: ['error', 'single'], // Enforce single quotes
    },
};
