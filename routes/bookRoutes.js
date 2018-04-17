const googleBookSearch = require('../services/googleBookSearch');

const mongoose = require('mongoose');
const User = mongoose.model('users');
const Book = mongoose.model('books');

module.exports = app => {
  app.get('/api/book_search', async (req, res) => {
    const bookSuggestionArray = await googleBookSearch(req.query.query);
    res.send(bookSuggestionArray);
  });

  app.post('/api/submit_book', async (req, res) => {
    const { id, title, subtitle, authors, smallThumbnail } = req.body;
    const book = new Book({
      id,
      title,
      subtitle,
      authors,
      smallThumbnail,
      _user: req.user.id
    });
    res.send(await book.save());
  });

  app.get('/api/all_books', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
  });

  app.post('/api/request_book', async (req, res) => {
    const { bookRecordId, requestorId } = req.body;
    const book = await Book.findById(bookRecordId);

    for (var i = 0; i < book._requestors.length; i++) {
      if (book._requestors[0].toString() === req.user.id) {
        console.log(requestorId);
        res.status(500).send('Already requested');
        return;
      }
    }
    book._requestors.push(requestorId);
    await book.save();
    const books = await Book.find({});
    res.send(books);
  });

  app.post('/api/delete_request', async (req, res) => {
    const { bookRecordId, requestorId } = req.body;
    const book = await Book.findById(bookRecordId);

    book._requestors.splice(book._requestors.indexOf(requestorId), 1);
    await book.save();
    const books = await Book.find({});
    res.send(books);
  });

  app.post('/api/unlist_book', async (req, res) => {
    const { bookRecordId, requestorId } = req.body;
    const book = await Book.findByIdAndRemove(bookRecordId);
    const books = await Book.find({});
    res.send(books);
  });
};
