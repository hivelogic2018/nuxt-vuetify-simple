// @ts-check
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import typescriptEslintParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'
import withNuxt from './.nuxt/eslint.config.mjs'

// import importPlugin from 'eslint-plugin-import'
// import typescriptEslint from '@typescript-eslint/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
const customConfig = [
  {
    files: ['**/*.{ts,js,vue}'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
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
    plugins: {
      vue,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-var-requires': 'off',

      // JS/Style rules
      'comma-dangle': ['error', 'always-multiline'],
      'import/order': ['error', {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }],
      'indent': ['error', 'tab'],
      'key-spacing': 'off',
      'max-len': ['error', 480, 2],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-extend-native': 'off',
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': 'off',
      'prefer-const': ['error', {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      }],
      'quotes': ['error', 'single', {
        allowTemplateLiterals: true,
        avoidEscape: true,
      }],
      'semi': ['error', 'never'],
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      }],

      // Vue rules
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'] // your preferred order
      }],
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        // @ts-ignore
        ignores: ['pre', 'textarea'],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: { max: 1 }
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always'
      }],
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'error',
      'vue/no-unused-components': 'warn',
      'vue/require-default-prop': 'off',

      // Prettier
      'prettier/prettier': 'error',
    },
  },
  prettier,
]

export default withNuxt(customConfig)
