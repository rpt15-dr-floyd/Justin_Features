const Sequelize = require('sequelize');

const sequelize = new Sequelize('feature', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been made with postgres & sequelize');
  })
  .catch(err => {
    console.log(err);
  });

const Game = sequelize.define('game', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  aboutHeader: { type: Sequelize.STRING },
  aboutBody: { type: Sequelize.STRING },
  featureTitle: { type: Sequelize.STRING },
  features: { type: Sequelize.STRING }
});


module.exports = {
  Game
};
