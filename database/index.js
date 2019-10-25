const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected to the DB');
  // we're connected!
});

//each home
const homeSchema = new Schema({
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

//home set
const homeSetSchema = new Schema({
  home_id: Number,
  homes: [homeSchema]
});


var EachHome = mongoose.model('EachHome', homeSchema);

var HomeSet =  mongoose.model('HomeSet', homeSetSchema);

module.exports = {
  EachHome: EachHome,
  HomeSet: HomeSet
};

