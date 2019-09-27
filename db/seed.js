const {AboutThisGame} = require('./aboutThisGame.js');
const RecentUpdates = require('./recentUpdates.js')
const faker = require('faker');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/aboutGame', { useNewUrlParser: true });

// console.log('*****AboutThisGameModel***', AboutThisGame);
// console.log('*****RecentUpdatesModel***', RecentUpdates);

const seedDataMaker = (count) => {
  // var array = [];
  for (var i = 0; i < count; ++i) {
    // let recentUpdateData = new RecentUpdates({
    //   updateDate: faker.date.past(),
    //   updateBody: faker.lorem.paragraph(),
    //   updateComments: faker.random.number()
    // });
    // recentUpdateData.save();

    let aboutThisGameData = new AboutThisGame({
      aboutHeader: faker.lorem.sentence(),
      aboutBody: faker.lorem.paragraph(),
      featureTitle: faker.lorem.sentence(),
      features: faker.lorem.paragraphs()
    });
    aboutThisGameData.save();
    
  }
}
//makes 100 example data reviews as per directions from Learn
seedDataMaker(100);
// console.log(AboutThisGame);
