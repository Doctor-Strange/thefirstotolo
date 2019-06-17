const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'fa',
  otherLanguages: ['en'],
  localeSubpaths: 'foreign'
});
