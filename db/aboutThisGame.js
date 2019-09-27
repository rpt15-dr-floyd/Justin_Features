const db = require('./index.js');
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;


const aboutThisGameSchema = new mongoose.Schema({
  aboutHeader: String,
  aboutBody: String,
  featureTitle: String,
  features: String
});

const AboutThisGame = mongoose.model('aboutThisGame', aboutThisGameSchema);


module.exports = {AboutThisGame}