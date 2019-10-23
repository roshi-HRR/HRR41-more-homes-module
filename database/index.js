const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected to the DB');
  // we're connected!
});

const schema = new Schema({
  id: Number,
  title: String,
  location: String,
  photos: [String],
  cost: Number,
  rating: Number,
  reviews: Number,
  type: String,
  favorite: Boolean
});

module.exports = mongoose.model('Home', schema);

