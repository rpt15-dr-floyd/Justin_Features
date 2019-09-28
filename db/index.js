const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aboutGame', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://josh:Fun32111@aboutgame-ezywq.mongodb.net/aboutGame?retryWrites=true&w=majority&authSource=true', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://josh:<password>@aboutgame-ezywq.mongodb.net/test');
const { AboutThisGame } = require('./aboutThisGame.js');
let db = mongoose.connection;

let aboutGameFeatures = (gameId, callback) => {
  AboutThisGame.find({ gameId: gameId }, null, { limit: 5 }, function(
    err,
    data
  ) {
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

module.exports = {
  db,
  aboutGameFeatures,
  createGameFeatures
};
