const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/aboutGame', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://josh:Fun32111@aboutgame-ezywq.mongodb.net/aboutGame?retryWrites=true&w=majority&authSource=true', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://josh:<password>@aboutgame-ezywq.mongodb.net/test');
const {AboutThisGame} = require('./aboutThisGame.js');
let db = mongoose.connection;


// const options = {
//   autoIndex: false, // Don't build indexes
//   reconnectTries: 30, // Retry up to 30 times
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 10, // Maintain up to 10 socket connections
//   // If not connected, return errors immediately rather than waiting for reconnect
//   bufferMaxEntries: 0,
//   useNewUrlParser: true
// };

// const connectWithRetry = () => {
//   console.log('MongoDB connection with retry');
//   mongoose
//     .connect(
//       'mongodb+srv://justinrobertohara:root@justincluster-pvv5d.mongodb.net/NikeReview?retryWrites=true&w=majority&authSource=true',
//       options
//     )
//     .then(() => {
//       console.log(`MongoDB is connected`);
//     })
//     .catch(err => {
//       console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
//       setTimeout(connectWithRetry, 5000);
//     });
// };

// connectWithRetry();



let aboutGameFeatures = (gameId, callback) => {
  AboutThisGame.find({gameId: gameId}, null, { limit: 5}, function(err, data) {
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