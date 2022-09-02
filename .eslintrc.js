module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names ': 0,
    'space-before-function-paren': 0,
    'vue/no-deprecated-slot-attribute': 0,
    'vue/no-async-in-computed-properties': 0,
    indent: ['off', 2]
  }
}
