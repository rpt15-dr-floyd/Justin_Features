const express = require('express');
const bodyParser = require('body-parser');
const {
  db,
  aboutGameFeatures,
  createGameFeatures,
  updateGameFeatures,
  deleteGame
} = require('../db/index.js');
const app = express();
const cors = require('cors');
const { Game } = require('../db/postgres.js');
const newRelic = require('newrelic');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));
app.use('/:gameId', express.static('public'));

app.use(cors());

app.get('/api/features/:gameId?', function(req, res) {
  let gameId = req.params.gameId;
  aboutGameFeatures(gameId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.stringify(data));
    }
  });
});

app.post('/api/features/', (req, res) => {
  let newGame = req.body;
  createGameFeatures(newGame, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send('you have created a new game in the database');
    }
  });
});

app.put('/api/features/:gameId?', (req, res) => {
  let updateGame = req.body;
  updateGameFeatures(updateGame, err => {
    if (err) {
      console.log(err);
    } else {
      res
        .status(202)
        .send(`you have updated updated game id ${updateGame.gameId}`);
    }
  });
});

app.delete('/api/features/:gameId?', (req, res) => {
  let id = req.params.gameId;
  deleteGame(id, err => {
    if (err) {
      console.log(err);
    } else {
      res.status(202).send(`you have deleted game id ${id}`);
    }
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Justin's App listening on ${port}`);
});
