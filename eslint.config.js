import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxRuntimePlugin from 'eslint-plugin-react/configs/jsx-runtime.js';
import prettierConfig from 'eslint-config-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/**',
      '*.config.js',
      'vite.config.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: eslintPluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      indent: 'off',
      semi: 'off',
      quotes: 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // React rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      // Best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'prefer-const': 'warn',
      eqeqeq: ['error', 'always'],

      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  jsxRuntimePlugin,
  prettierConfig,
];
