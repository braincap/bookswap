const axios = require('axios');
const keys = require('../config/keys');

module.exports = async query => {
  const books = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&orderBy=relevance&key=${
      keys.googleAPIKeyBooks
    }`
  );

  return !books.data.items
    ? []
    : books.data.items.map(book => {
        const {
          id,
          volumeInfo: {
            title,
            subtitle = '',
            authors = [],
            imageLinks: { smallThumbnail } = {}
          }
        } = book;
        return {
          id,
          title,
          subtitle,
          authors,
          smallThumbnail
        };
      });
};
