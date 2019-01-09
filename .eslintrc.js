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
        'plugin:vue/recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'space-before-function-paren': 0,
        'object-property-newline': 0,
        'quotes': ['error', 'single'],
        'new-cap': 0,
        'no-eval': 0,
        'semi': ['error', 'always'],
        'indent': [0, 4],
        'vue/html-indent': [0, 4],
        'vue/max-attributes-per-line': 0,
        'no-return-assign': 0,
        'no-new': 0,
        'curly': 0,
        'no-return-await': 0,
        'promise/param-names': 0
    }
}
