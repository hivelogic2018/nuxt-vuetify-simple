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
      'coverage',
      '*.mjs',
      'bun.lock'
      // add more patterns as needed
    ],
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-var-requires': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 'tab'],
      'key-spacing': 'off',
      'max-len': ['error', 480, 2],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-extend-native': 'off',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'error',
      // or 'warn'
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': 'off',
      'prefer-const': ['error', {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }],
      'quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true
      }],
      'semi': ['error', 'never'],
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'asyncArrow': 'always',
        'named': 'never'
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'error',
      'vue/no-unused-components': 'warn',
      'vue/require-default-prop': 'off'
    }
  }
]

export default withNuxt(customConfig)