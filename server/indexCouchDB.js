require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');


const nano = require('nano')('http://localhost:5984');
const features = nano.db.use('features');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

app.use('/:gameId', express.static('public'));

app.use(cors());

app.get('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;

  //selector, _id and $eq need to be wrapped in double quotations
  const q = {
    "selector": {
      "_id": {
        "$eq": gameId
      }
    }
  };

  console.log(gameId)
  features
    .find(q)
    .then(doc => {
      res.status(200).send(doc.docs[0]);
    })
    .catch(err => {
      console.log(err);
    });
});



app.post('/api/features/', (req, res) => {
  let newGame = req.body;
  let newId = null

  nano.db.get('features').then((doc) => {
    newId = (doc.doc_count + 1).toString()
    newGame._id = newId
    features.insert(newGame, (err, body) => {
      if (err) {
        console.log(err);
      } else {
        res.status(202).send(`you have updated ${newGame._id}`);
      }
    })
  }).catch(err => { console.log(err) })



});

app.put('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;
  let updateGame = req.body;

  const q = {
    "selector": {
      "_id": {
        "$eq": gameId
      }
    }
  };

  features
    .find(q)
    .then(doc => {
      let ref = doc.docs[0]._rev
      features.insert({ _id: gameId, _rev: ref, aboutHeader: updateGame.aboutHeader, aboutBody: updateGame.aboutHeader, featureTitle: updateGame.featureTitle, features: updateGame.features }).then((body) => {
        res.status(202).send(`you have updated ${gameId}`)
      }).catch(err => { console.log(err) })
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/api/features/:gameId?', (req, res) => {
  let gameId = req.params.gameId;
  const q = {
    "selector": {
      "_id": {
        "$eq": gameId
      }
    }
  };

  features
    .find(q)
    .then(doc => {
      let ref = doc.docs[0]._rev
      features.destroy(gameId, ref).then((body) => {
        res.status(202).send(`you have deleted ${gameId}`)
      }).catch(err => { console.log(err) })
    })
    .catch(err => {
      console.log(err);
    });
});

const port = 1235;

app.listen(port, () => {
  console.log(`Justins App listening on ${port} for CouchDB`);
});
