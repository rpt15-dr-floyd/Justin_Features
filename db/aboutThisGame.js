const db = require('./index.js');
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var autoIncrement = require('mongoose-auto-increment');

const aboutThisGameSchema = new mongoose.Schema({
  gameId: { type: Number, required: true },
  aboutHeader: { type: String, required: true },
  aboutBody: { type: String, required: true },
  featureTitle: { type: String, required: true },
  features: { type: String, required: true }
});

const AboutThisGame = mongoose.model('aboutThisGame', aboutThisGameSchema);

module.exports = { AboutThisGame };
