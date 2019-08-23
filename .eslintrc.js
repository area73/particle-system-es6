module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'no-restricted-globals': 'off',
    'no-unused-expressions': ['error', { allowTernary: true , allowShortCircuit:true }],
    'no-bitwise': ['error', { allow: ['~', '>>'] }],
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 'off',
    'no-mixed-operators': 'off',
    'no-undef': 0,
    'no-unused-vars': [0, {'vars': 'all', 'args': 'after-used'}],
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'bower_components'],
      },
    },
  },
  plugins: ['html', 'prettier'],
};
