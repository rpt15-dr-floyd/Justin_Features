const Sequelize = require('sequelize');

const sequelize = new Sequelize('feature', 'power_user', 'root', {
  host: 'ec2-18-191-197-10.us-east-2.compute.amazonaws.com',
  dialect: 'postgres',
  logging: false,
  ssl: true
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
  Game,
  sequelize
};
