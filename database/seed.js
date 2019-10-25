const mongoose = require('mongoose');
const Schema = require('./index');
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
const isFavorite = () => Math.random() < 0.5;

//returns random number between 0 and 5, 2 decimal places
const rating = function() {
  var rateMin = 3;
  var rateMax = 5;
  return (Math.random() * (rateMax - rateMin) + rateMin).toFixed(2);
}

//returns random number between 80 and 150
const cost = function() {
  var min = 80;
  var max = 150;
  return Math.floor(Math.random() * (max - min) + min);
}

var currIndex = 0;
var getHomeImg = function() {

  var currImgSet = homesImages.allHomes[currIndex];
  if (currIndex === homesImages.allHomes.length - 1) {
    currIndex = 0;
  } else {
    currIndex += 1;
  }
  return currImgSet;
}

var makeHomesSet = () => {
  var homesArr = [];

  for (var i = 0; i < 10; i++) {
    var eachHome = new Schema.EachHome({
      id: i,
      title: faker.lorem.words(),
      location: faker.address.city(),
      photos: getHomeImg(),
      cost: cost(),
      rating: rating(),
      reviews: faker.random.number(),
      type: faker.lorem.word(),
      favorite: isFavorite()
    });

    homesArr.push(eachHome);
  }
  return homesArr;
}

// const makeHomesSet = () => {
//   var homesArr = [];
//   for (var i = 0; i < 10; i++) {
//     var oneHome = new HomeObjMaker;
//     homesArr.push(oneHome);
//   }
//   return homesArr;
// }


var homesForDB = [];

for (var i = 0; i < 101; i++) {
  var home = new Schema.HomeSet({
      home_id : i,
      homes : makeHomesSet()
    });

  homesForDB.push(home);
}


Schema.HomeSet.deleteMany({}, function (err) {
  if (err) {
    console.log(err);
  }
    console.log('clean db');
});

for (var i = 0; i < homesForDB.length; i++) {
  homesForDB[i].save(function(err, result) {
    if (i === homesForDB.length) {
      // console.log('data saved');
      mongoose.disconnect();
    }
  })
}
