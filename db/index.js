const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aboutGame', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://josh:Fun32111@aboutgame-ezywq.mongodb.net/aboutGame?retryWrites=true&w=majority&authSource=true', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://josh:<password>@aboutgame-ezywq.mongodb.net/test');
const { AboutThisGame } = require('./aboutThisGame.js');
const db = mongoose.connection;

const aboutGameFeatures = (gameId, callback) => {
  AboutThisGame.find({ gameId: gameId }, null, { limit: 5 }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const createGameFeatures = (game, callback) => {
  let newGame = new AboutThisGame(game);
  newGame.save(err => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

const updateGameFeatures = (game, callback) => {
  AboutThisGame.findOneAndUpdate(
    { gameId: game.gameId },
    {
      aboutHeader: game.aboutHeader,
      aboutBody: game.aboutBody,
      featureTitle: game.featureTitle,
      features: game.features
    },
    { upsert: true },
    err => {
      if (err) {
        console.log(err);
      } else {
        callback(null);
      }
    }
  );
};

const deleteGame = (id, callback) => {
  console.log('this is the id in the db fn', id);
  AboutThisGame.deleteOne({ gameId: id }, err => {
    if (err) {
      console.log(err);
    } else {
      callback(null);
    }
  });
};

module.exports = {
  db,
  aboutGameFeatures,
  createGameFeatures,
  updateGameFeatures,
  deleteGame
};
