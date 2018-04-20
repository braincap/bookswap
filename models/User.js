const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  city: String,
  state: String,
  contact: String
});

mongoose.model('users', userSchema);
