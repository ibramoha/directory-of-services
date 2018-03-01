module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: [],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src/'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true,
    es6: true,
  },
};
