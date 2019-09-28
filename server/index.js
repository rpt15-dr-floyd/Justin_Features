const express = require('express');
const bodyParser = require('body-parser');
const { db, aboutGameFeatures, createGameFeatures } = require('../db/index.js');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));
// app.use('/:gameId', express.static('public'));

app.use(cors());

app.get('/api/features/:gameId?', function(req, res) {
  console.log('req.params ', req.params); //not logging
  aboutGameFeatures(req.params.gameId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.stringify(data));
    }
  });
});

app.post('/api/features/', (req, res) => {
  let newGame = req.body;
  console.log('this is the new game', newGame);
  createGameFeatures(newGame, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(202).send('you have created a new game in the database');
    }
  });
});

app.put('/api/features/:gameId', (req, res) => {});

app.delete('/api/features/:gameId', (req, res) => {});

const port = 8081;
app.listen(port, () => {
  console.log(`Justin's App listening on ${port}`);
});
