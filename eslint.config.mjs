import { FlatCompat } from '@eslint/eslintrc'
import eslintJs from '@eslint/js'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

const compat = new FlatCompat()

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslintJs.configs.all,
  ...compat.extends('plugin:storybook/recommended', 'plugin:react/all'),
  {
    ignores: [
      '.cache',
      '.storybook',
      '.yarn',
      'public',
      'static',
    ],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'array-bracket-newline': 'off',
      'array-bracket-spacing': [ 'error', 'always' ],
      'array-element-newline': 'off',
      'arrow-parens': [ 'error', 'as-needed' ],
      'camelcase': 'off',
      'comma-dangle': 'off',
      'consistent-return': 'off',
      'dot-location': [ 'error', 'property' ],
      'function-call-argument-newline': 'off',
      'id-length': 'off',
      'indent': [ 'error', 2 ],
      'init-declarations': 'off',
      'max-len': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'multiline-comment-style': 'off',
      'multiline-ternary': 'off',
      'no-continue': 'off',
      'no-confusing-arrow': 'off',
      'no-extra-parens': 'off',
      'no-magic-numbers': 'off',
      'no-mixed-operators': 'off',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'off',
      'no-process-env': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-warning-comments': 'warn',
      'object-curly-spacing': [ 'error', 'always' ],
      'object-property-newline': 'off',
      'one-var': [
        'error',
        {
          initialized: 'never',
          uninitialized: 'always',
        },
      ],
      'padded-blocks': [ 'error', 'never' ],
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: true,
        },
      ],
      'prefer-destructuring': 'off',
      'quote-props': [ 'error', 'consistent-as-needed' ],
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'never' ],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
        },
      ],
      'sort-keys': 'off',
      'sort-vars': 'off',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never',
        },
      ],
    },
  },
  {
    files: [
      '**/*.{ts,tsx}',
    ],
    ...typescriptEslint.configs.base,
    languageOptions: {
      ...typescriptEslint.configs.base.languageOptions,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...Object.assign({}, ...typescriptEslint.configs.all.map(({ rules }) => rules)),
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-type-alias': [
        'error',
        {
          allowAliases: 'always',
          allowConditionalTypes: 'always',
          allowGenerics: 'always',
          allowLiterals: 'always',
          allowMappedTypes: 'always',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true,
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/typedef': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'no-duplicate-imports': 'off',
      'one-var': 'off',
      'react/forbid-component-props': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-closing-bracket-location': [ 'error', 'after-props' ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: [ '.tsx' ],
        },
      ],
      'react/jsx-first-prop-new-line': 'off',
      'react/jsx-indent': [ 'error', 2 ],
      'react/jsx-indent-props': [ 'error', 2 ],
      'react/jsx-max-depth': 'off',
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-sort-props': 'off',
      'react/jsx-uses-react': 'off',
      'react/no-adjacent-inline-elements': 'off',
      'react/no-invalid-html-attribute': 'off',
      'react/no-multi-comp': [
        'error',
        {
          ignoreStateless: true,
        },
      ],
      'react/no-unused-prop-types': 'off',
      'react/prefer-read-only-props': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]
