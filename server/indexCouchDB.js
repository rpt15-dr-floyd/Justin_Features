const express = require('express');
const bodyParser = require('body-parser');

const nano = require('nano')('http://localhost:5984');
const features = nano.db.use('features');

// console.log(features);

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

app.use('/:gameId', express.static('public'));

app.use(cors());

app.get('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;

  features
    .find({
      selector: {
        featureTitle: { $eq: 'Odio hic ad.' }
      }
    })
    .then(doc => {
      console.log('then block');
      res.status(200).send(doc);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/api/features/', (req, res) => {
  let newGame = req.body;

  features.insert(newGame, (err, body) => {
    if (err) {
      console.log(err);
    } else {
      res.status(202).send(`you have updated ${newGame.id}`);
    }
  });
});

app.put('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;
  let updateGame = req.body;

  features.insert({ id: gameId }, updateGame, (err, body) => {
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

  features.destroy(id, (err, body) => {
    if (err) {
      console.log(err);
    } else {
      res.status(202).send(`you have deleted id ${id}`);
    }
  });
});

const port = 1235;

app.listen(port, () => {
  console.log(`Justins App listening on ${port} for CouchDB`);
});
