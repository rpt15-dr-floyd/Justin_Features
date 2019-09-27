const db = require('./index.js');
const mongoose = require('mongoose');

const recentUpdatesSchema = new mongoose.Schema({
  updateDate: String,
  //Note4Later: hardcode version and System Req
  updateBody: String,
  updateComments: Number,
});

const recentUpdates = mongoose.model('RecentUpdates', recentUpdatesSchema);


module.exports = {recentUpdates}