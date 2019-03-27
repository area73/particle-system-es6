module.exports = function(wallaby) {
  return {
    files: ['src/**/*.js'],
    tests: ['test/**/*.test.js'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    debug: true,
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      }),
    },
  };
};
