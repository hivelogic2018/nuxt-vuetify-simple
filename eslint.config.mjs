// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import vueEslintParser from 'vue-eslint-parser'

/** @type {import('eslint').Linter.FlatConfig[]} */
const customConfig = [
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    ignores: [
      'node_modules',
      '.nuxt',
      'dist',
      // add more patterns as needed
    ],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'key-spacing': 'off',
      'max-len': ['error', 480, 2],
      'object-curly-spacing': ['error', 'always'],
      'one-var': 'off',
      'no-var': 'error',
      'semi': ['error', 'never'],
      'no-extend-native': 'off',
      'prefer-const': ['error', {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }],
      'indent': ['error', 'tab'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'vue/multi-word-component-names': 'off'
    }
  }
]

export default withNuxt(customConfig)
