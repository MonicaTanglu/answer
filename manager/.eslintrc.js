module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
        // "@vue/prettier",
        // "@vue/prettier/@typescript-eslint"
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: false
        }
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        'vue/max-attributes-per-line': 0,
        'no-mixed-operators': 0,
        'space-before-function-paren': 0,
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 5,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        'symbol-description': 0,
        'vue/attribute-hyphenation': 0,
        'vue/html-self-closing': 0,
        'vue/html-indent': [1, 2],
        'vue/component-name-in-template-casing': 0,
        'vue/html-closing-bracket-spacing': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/no-unused-components': 0,
        'vue/multiline-html-element-content-newline': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/html-closing-bracket-newline': 0,
        'vue/no-parsing-error': 0,
        'no-console': 0,
        '@typescript-eslint/no-this-alias': 0,
        'vue/no-unused-vars': 0,
        'no-prototype-builtins': 0,
        'no-tabs': 0
            // indent: [1, 2, { SwitchCase: 1 }]
    },
    overrides: [{
        files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
        env: {
            jest: true
        }
    }]
}