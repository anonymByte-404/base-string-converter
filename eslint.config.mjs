import prettierPlugin from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2020, // Enable modern JavaScript features
      sourceType: 'module', // Use ES module syntax
      parser: tsParser, // Parse TypeScript files
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': [
        'error',
        {
          semi: false, // No semicolons
          singleQuote: true, // Use single quotes
          tabWidth: 2, // Set tab width to 2 spaces
          trailingComma: 'es5', // Add trailing commas where valid in ES5
          printWidth: 80, // Line length before breaking into a new line
          arrowParens: 'always', // Always include parentheses for single argument arrow functions
          bracketSpacing: true, // Add spaces between brackets
        },
      ],
    },
  },
]
