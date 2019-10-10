const express = require('express');
const bodyParser = require('body-parser');

const { Game } = require('../db/postgres.js');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

app.use('/:gameId', express.static('public'));

app.use(cors());

app.get('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;

  Game.findAll({ where: { id: gameId } })
    .then(data => {
      console.log(`you have searched ${gameId}`);
      res.status(200).send(data);
    })
    .catch(err => res.status(404).send('no id has matched', err));
});

app.post('/api/features', (req, res) => {
  let newGame = req.body;

  Game.update({ where: { id: gameId }, newGame })
    .then(() => {
      res.status(202).send(`you have updated ${newGame.id}`);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;
  let updateGame = req.body;

  Game.update({ id: gameId }, updateGame).then(() => {
    res
      .status(202)
      .send(`you have updated updated game id ${updateGame.gameId}`);
  });
});

app.delete('/api/features/:gameId', (req, res) => {
  let id = req.params.gameId;

  Game.destroy({ id: gameId }).then(() => {
    res.status(202).send(`you have deleted id ${id}`);
  });
});

const port = 1234;
app.listen(port, () => {
  console.log(`Justin's App listening on ${port} for Postgres DB`);
});
