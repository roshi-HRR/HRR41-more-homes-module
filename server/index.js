const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const port = 1022;
const Home = require('../database/index').HomeSet;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/homes', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//static
app.use(express.static('public'));

//routes
app.get('/homes', function (req, res) {
  var homes = Home.find({'home_id': req.query.id})
    .then((homes) => {
      res.send(homes);
    })
    .catch((err) => {
     res.send(err);
    });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});