module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'avoid',
  // Gherkin/Cucumber formatting
  plugins: ['prettier-plugin-gherkin'],
  overrides: [
    {
      files: '*.feature',
      options: {
        printWidth: 120,
      },
    },
  ],
};
