module.exports = {
  trailingComma: "all",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSpacing: true,
  singleQuote: true,
  endOfLine: "lf",
  overrides: [
    {
      files: "*.scss",
      options: {
        singleQuote: false
      }
    }
  ]
};
