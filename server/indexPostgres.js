const express = require('express');
const bodyParser = require('body-parser');
// const newRelic = require('newrelic');
const { Game } = require('../db/postgres.js');
const app = express();
const cors = require('cors');

// const CompressionPlugin = require('compression-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
const expressStaticGzip = require('express-static-gzip');

//allowing cors
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//gzip and broccoli compressed bundle.js.br and bundle.js.gz
// app.use('/', express.static(__dirname + '/../')); //loader.io

app.use('/', express.static('public/dist'));

//express is not additive
app.use(
  '/:gameId',
  expressStaticGzip('public/dist', {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);

// app.use('/:gameId', express.static('public/dist'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control: max-age=1');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;

  console.log(`you have searched ${gameId}`);

  Game.findAll({ where: { id: gameId } })
    .then(data => {
      console.log(`you have searched ${gameId}`);
      res.status(200).send(data);
    })
    .catch(err => res.status(404).send('no id has matched', err));
});

app.post('/api/features', (req, res) => {
  let newGame = req.body;

  Game.upsert({ newGame })
    .then(() => {
      res.status(202).send(`you have inserted ${newGame}`);
    })
    .catch(err => {
      console.log(err);
    });
});

app.put('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;
  let updateGame = req.body;
  console.log('game id', gameId, 'updateGame', updateGame);

  Game.update(
    {
      aboutHeader: updateGame.aboutHeader,
      aboutBody: updateGame.aboutBody,
      featureTitle: updateGame.featureTitle,
      features: updateGame.features
    },
    { where: { id: gameId } }
  ).then(() => {
    res.status(202).send(`you have updated updated game id ${gameId}`);
  });
});

app.delete('/api/features/:gameId', (req, res) => {
  let id = req.params.gameId;

  Game.destroy({ where: { id: id } }).then(() => {
    res.status(202).send(`you have deleted id ${id}`);
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Justin's App listening on ${port} for Postgres DB`);
});
