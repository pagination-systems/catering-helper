import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    // Ignore files globally
    ignores: ['**/node_modules/', '**/dist/', '**/build/', '**/.next/'],
  },

  // 1. Standard JavaScript Files
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },

  // 2. TypeScript Files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Load standard recommended TypeScript rules
      ...tsPlugin.configs.recommended.rules,

      'no-console': 'warn',

      // CRITICAL: Turn off the base JS rule and use the TS version instead.
      // Otherwise, ESLint will falsely flag TypeScript types/interfaces as "unused variables".
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // 3. Prettier config MUST be last so it overrides any conflicting formatting rules
  eslintConfigPrettier,
];
