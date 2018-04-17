const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  id: String,
  title: String,
  subtitle: String,
  authors: [],
  smallThumbnail: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _requestors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('books', bookSchema);
