const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aboutGame', { useNewUrlParser: true });
const {AboutThisGame} = require('./aboutThisGame.js');
let db = mongoose.connection;

let aboutGameFeatures = (callback) => {
  AboutThisGame.find({}, null, { limit: 5}, function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

// let findTopThreeReviews = (callback) => {
//   AboutGame.find({}, null, { limit: 3, sort: { helpful: -1 } }, function (err, data) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, data);
//     }
//   });
// }

module.exports = {
  db,
  aboutGameFeatures
}