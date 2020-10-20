// eslint-disable-next-line functional/immutable-data
module.exports = {
  extends: [
    'standard',
    'prettier',
    'plugin:jest-dom/recommended',
    'plugin:functional/external-recommended',
    'plugin:functional/recommended',
  ],
  plugins: ['jest-dom', 'functional', 'html', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  env: {
    browser: true,
  },
  rules: {
    'functional/functional-parameters': ['off'],
    'functional/no-expression-statement': ['off'], // for educational purpose
    '@typescript-eslint/consistent-type-definitions': ['off'],
    'no-unused-vars': [0, { vars: 'all', args: 'after-used' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/**/*.spec.*', 'conf/webpack/*'],
      },
    ],
    'no-restricted-globals': 'off',
    'no-unused-expressions': [
      'error',
      { allowTernary: true, allowShortCircuit: true },
    ],
    'no-bitwise': ['error', { allow: ['~', '>>'] }],
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 'off',
    'no-mixed-operators': 'off',
    'no-undef': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 'error',
  },

  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        moduleDirectory: ['node_modules'],
      },
    },
  },
};
