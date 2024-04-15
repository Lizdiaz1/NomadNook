module.exports = {
  overrides: [
    {
      files: [
        "src/context/*.jsx",
        "backend/utils/*.js"  
      ],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    }
  ],
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: { version: '18.2' }
  },
  plugins: ['react-refresh'],
  ignorePatterns: ['dist', 'node_modules'],  // Make sure backend is not being ignored
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/prop-types': 'off'
  },
}
