const mongoose = require('mongoose');
const Home = require('./index');
mongoose.Promise = global.Promise;
const faker = require('faker');
const homesImages = require('./homes');

mongoose.connect('mongodb://localhost:27017/homes', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Database connection successful');
    })
  .catch((err) => {
      console.error('Database connection error');
    }) ;

//Random generators
//returns random true or false
var favorite = function() {
  var num = Math.floor(Math.random() * Math.floor(2))
  if (num === 1) {
    return true;
  } else if (num === 0) {
    return false;
  }
}

//returns random number between 0 and 5, 2 decimal places
var rating = function() {
  var rateMin = 3;
  var rateMax = 5;
  return (Math.random() * (rateMax - rateMin) + rateMin).toFixed(2);
}

//returns random number between 80 and 150
var cost =function() {
  var min = 80;
  var max = 150;
  return Math.floor(Math.random() * (max - min) + min);
}

//import an array of arrays for images

var homes = []; //store new instances of home

for (var i = 0; i < 11; i++) {
  var home = new Home({
      id : i,
      title: faker.lorem.words(),
      location: faker.address.city(),
      photos: homesImages.allHomes[i],
      cost: cost(),
      rating: rating(),
      reviews: faker.random.number(),
      type: faker.lorem.word(),
      favorite: favorite()
    });

  homes.push(home);
}

//clear database everytime seeding script is run.
Home.deleteMany({}, function (err) {
  if (err) {
    console.log(err);
  }
    console.log('clean db');
});

//save homes to DB
for (var i = 0; i < homes.length; i++) {
  homes[i].save(function(err, result) {
    if (i === 11) {
      console.log('data saved');
      mongoose.disconnect();
    }
  })
}
