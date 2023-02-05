module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['/build/**/*'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
    plugins: ['prettier'],
    rules: {
      'import/prefer-default-export': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'global-require': 'off',
      'class-methods-use-this': 'off',
      'import/no-cycle': 'off',
    },
  };
  Footer
  