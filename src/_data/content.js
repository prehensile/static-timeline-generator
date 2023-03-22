const fs = require('fs');

const header = 'Making things with computers since 2000.';
const footer = 'Made by prehensile in 2023.'
const entries = JSON.parse( fs.readFileSync("./src/_data/entries.json") );

// Page details
const pageTitle = 'Henry Cooke - Timeline'; // The title of the page that shows in the browser tab
const pageDescription = "Things I've made with computers since 2000."; // The description of the page for search engines
const pageAuthor = 'Henry Cooke'; // Your name

// DON'T EDIT BELOW THIS LINE! --------------------------------------------------------------------
const getFilters = (entries) => {
  const filters = new Set();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      for (var j = 0; j < entry.categories.length; j++) {
        filters.add(entry.categories[j]);
      }
    }
  }
  var filtersArray = [...filters];
  filtersArray.sort();
  return filtersArray;
};

const addCategoriesStringsToEntries = (entries) => {
  for (const entry of entries) {
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      entry.categoriesString = entry.categories.join(',');
    }
  }
  return entries;
};

module.exports = {
  header,
  footer,
  entries: addCategoriesStringsToEntries(entries),
  filters: getFilters(entries),
  head: {
    title: pageTitle,
    description: pageDescription,
    author: pageAuthor,
  },
};
