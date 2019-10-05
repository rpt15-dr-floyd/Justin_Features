const { Game } = require('./postgres.js');
const faker = require('faker');

const postgresDataSeed = numberOfDocuments => {
  let bulkData = [];
  for (let i = 0; i < numberOfDocuments; i++) {
    let newGame = {
      aboutHeader: faker.lorem.sentence(),
      aboutBody: faker.lorem.paragraph(
        (nb_sentences = 1),
        (variable_nb_sentences = true),
        (ext_word_list = null)
      ),
      featureTitle: faker.lorem.sentence(
        (nb_words = 3),
        (variable_nb_words = true),
        (ext_word_list = null)
      ),
      features: faker.lorem.paragraphs(
        (nb_sentences = 1),
        (variable_nb_sentences = true),
        (ext_word_list = null)
      )
    };
    bulkData.push(newGame);
  }

  console.log('~~~~~~~~~', bulkData.length);

  Game.sync({ force: true })
    .then(() => {
      Game.bulkCreate(bulkData).catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

postgresDataSeed(10);
