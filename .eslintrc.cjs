// Minimal ESLint config to avoid circular config errors during local lint runs.
// Keeps rules empty and avoids extending shared configs that may cause circular refs.
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}

