module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': [1, 4],
        'vue/html-indent': [1, 4],
        'vue/max-attributes-per-line': 0,
        'vue/require-default-prop': 0,
        'vue/attributes-order': 0,
    }
}
