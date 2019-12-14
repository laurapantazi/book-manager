module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'prettier/vue'
  ],
  rules: {
    'arrow-spacing': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'keyword-spacing': ['error', { before: true }],
    'no-duplicate-imports': 'error',
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1 }],
    'no-unreachable': 'error',
    'no-unused-vars': 0,
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
    'prefer-arrow-callback': 'error',
    'prettier/prettier': [
      'error',
      {
        printWidth: 200,
        jsxBracketSameLine: true,
        tabWidth: 2,
        proseWrap: 'never',
        semi: false,
        singleQuote: true
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['router-link', 'router-view', 'transition']
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['vue', 'prettier']
}
