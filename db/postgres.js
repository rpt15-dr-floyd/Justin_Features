const Sequelize = require('sequelize');

const sequelize = new Sequelize('feature', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
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
  aboutHeader: { type: Sequelize.STRING(300) },
  aboutBody: { type: Sequelize.STRING(300) },
  featureTitle: { type: Sequelize.STRING(300) },
  features: { type: Sequelize.STRING(300) }
});

// sequelize.sync({ force: true }).then(() => {
//   console.log(`Database & tables created!`);
// });

module.exports = {
  Game
};
