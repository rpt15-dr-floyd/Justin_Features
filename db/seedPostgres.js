const { Game } = require('./postgres.js');
const faker = require('faker');
var async = require('async');

const postgresDataSeed = (index, target) => {
  if (index < target / 1000) {
    let bulkData = [];
    for (let i = 0; i < 1000; i++) {
      bulkData.push({
        aboutHeader: faker.lorem.sentence(),
        aboutBody: faker.lorem
          .paragraph(
            (nb_sentences = 1),
            (variable_nb_sentences = true),
            (ext_word_list = null)
          )
          .slice(0, 250),
        featureTitle: faker.lorem.sentence(
          (nb_words = 3),
          (variable_nb_words = true),
          (ext_word_list = null)
        ),
        features: faker.lorem
          .paragraphs(
            (nb_sentences = 1),
            (variable_nb_sentences = true),
            (ext_word_list = null)
          )
          .slice(0, 250)
      });
    }

    Game.bulkCreate(bulkData)
      .then(() => {
        index++;
        console.log(
          `you have successfully inserted ${index *
            1000} documents into postgres `
        );
        postgresDataSeed(index, target);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

postgresDataSeed(0, 10000000);
