const googleBookSearch = require("../services/googleBookSearch");

const mongoose = require("mongoose");
const User = mongoose.model("users");
const Book = mongoose.model("books");

module.exports = app => {
  app.get("/api/book_search", async (req, res) => {
    const bookSuggestionArray = await googleBookSearch(req.query.query);
    res.send(bookSuggestionArray);
  });

  app.post("/api/submit_book", async (req, res) => {
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

  app.get("/api/all_books", async (req, res) => {
    const books = await Book.find({});
    res.send(books);
  });
};
