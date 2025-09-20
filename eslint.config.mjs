import eslintJs from '@eslint/js'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginStorybook from 'eslint-plugin-storybook'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintJs.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  ...eslintPluginStorybook.configs['flat/recommended'],
  {
    ignores: [
      '.cache',
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
      'no-warning-comments': 'warn',
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
      ...Object.assign({}, ...typescriptEslint.configs.recommendedTypeChecked.map(({ rules }) => rules)),
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true,
        },
      ],
      '@typescript-eslint/unbound-method': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]
