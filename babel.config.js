// eslint-disable-next-line functional/immutable-data
module.exports = {
  presets: ['@babel/preset-env'],

  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          test: './test',
        },
      },
    ],
  ],
};
