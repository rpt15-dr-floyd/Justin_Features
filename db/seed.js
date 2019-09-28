const { AboutThisGame } = require('./aboutThisGame.js');
// const RecentUpdates = require('./recentUpdates.js')
const faker = require('faker');

const seedDataMaker = count => {
  // var array = [];
  for (var i = 0; i < count; ++i) {
    let aboutThisGameData = new AboutThisGame({
      gameId: i + 1,
      //should this be incrementing
      aboutHeader: faker.lorem.sentence(),
      aboutBody: faker.lorem.paragraph(),
      featureTitle: faker.lorem.sentence(),
      features: faker.lorem.paragraphs()
    });
    aboutThisGameData.save();
  }
  console.log(`you have seeded ${count} documents`);
};
//makes 100 example data reviews as per directions from Learn
seedDataMaker(100);
// console.log(AboutThisGame);
