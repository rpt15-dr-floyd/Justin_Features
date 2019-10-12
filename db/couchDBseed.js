const nano = require('nano')('http://localhost:5984');
const faker = require('faker');

const features = nano.db.use('features');

const seedCouchDB = (start, numOfDocs) => {
  if (start < numOfDocs / 1000) {
    let bulkData = [];
    for (let i = 0; i < 1000; i++) {
      let uniqueIdentifier = start * 1000 + i + 1;

      bulkData.push({
        _id: uniqueIdentifier.toString(),
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

    features
      .bulk({ docs: bulkData })
      .then(() => {
        start++;
        console.log(`you have inserted ${start * 1000}`);
        seedCouchDB(start, numOfDocs);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

seedCouchDB(0, 10000000);

module.exports = features;
