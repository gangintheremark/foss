module.exports = {
  root: true,
  env: { browser: true, es2020: true, module: "node", jest : "true" },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.ts',
    'jest.config.ts',
    'jest.setup.ts',
    'public/',
    'tailwind.config.ts',
  ],
}
