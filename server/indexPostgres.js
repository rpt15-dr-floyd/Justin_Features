const express = require('express');
const bodyParser = require('body-parser');
const { Game } = require('../db/postgres.js');
const app = express();
const cors = require('cors');
const port = 8081;
// const newRelic = require('newrelic');

//redis cache db set up ran with redis Labs
const redis = require('redis');
var redisHost = 'redis-18516.c14.us-east-1-3.ec2.cloud.redislabs.com';
var redisPort = 18516;
var redisAuth = 'X09gxwElaph9r9k6VsYRB30CsoxsxWrQ';
var client = redis.createClient(redisPort, redisHost, { no_ready_check: true });
client.auth(redisAuth, function(err) {
  if (err) {
    console.log(err);
  }
});
client.on('error', function(err) {
  console.log('Error ' + err);
});
client.on('connect', function() {
  console.log('Connected to Redis thumbs up');
});

//zipping webpack bundle files for quick load times
const expressStaticGzip = require('express-static-gzip');

//allowing cors
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//to test loader.io files
// app.use('/', express.static(__dirname + '/../')); //loader.io
app.use('/', express.static('public/dist'));

//express is not additive
//gzip and broccoli compressed bundle.js.br and bundle.js.gz
app.use(
  '/:gameId',
  expressStaticGzip('public/dist', {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);

//allowing cors()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control: max-age=1');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//get request
app.get('/api/features/:gameId', (req, res) => {
  let gameId = req.params.gameId;
  console.log(`you have searched ${gameId}`);
  //test

  //using redis cache to check key value pairs to return faster query result times
  // client.get(gameId, (err, val) => {
  //   if (err) {
  //     console.log(err);
  //   } else if (val) {
  //     console.log('getting a cache val', val);
  //     //redis cache makes use of stringified values, so make sure to parse back to front end
  //     res.status(200).send(JSON.parse(val));
  //   } else {
  //     console.log('using sequelize db');
  //     Game.findAll({ where: { id: gameId } })
  //       .then(data => {
  //         console.log(`you have searched ${gameId}`);
  //         //setting db cache with recently searched data, redis needs stringified values
  //         client.set(gameId, JSON.stringify(data));
  //         res.status(200).send(data);
  //       })
  //       .catch(err => res.status(404).send('no id has matched', err));
  //   }
  // });

  Game.findAll({ where: { id: gameId } })
    .then(data => {
      console.log(`you have searched ${gameId}`);
      //setting db cache with recently searched data, redis needs stringified values
      // client.set(gameId, JSON.stringify(data));
      res.status(200).send(data);
    })
    .catch(err => res.status(404).send('no id has matched', err));
});

//post request
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

//update request
app.put('/api/features/:gameId', (req, res) => {
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

//delete request
app.delete('/api/features/:gameId', (req, res) => {
  let id = req.params.gameId;

  Game.destroy({ where: { id: id } }).then(() => {
    res.status(202).send(`you have deleted id ${id}`);
  });
});

app.listen(port, () => {
  console.log(`Justin's App listening on ${port} for Postgres DB`);
});
