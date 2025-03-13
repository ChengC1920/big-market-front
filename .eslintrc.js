module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // 忽略未使用变量的错误
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',

        // 完全禁用 @ts-comment 的相关检测
        '@typescript-eslint/ban-ts-comment': 'off',

        // 如果有其他规则需要禁用，可以在这里添加
    },
};