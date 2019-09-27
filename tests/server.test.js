const request = require ('request');
test('API call works if property access of body can result in a string', (done) => {
  request('http://localhost:3003/api/features', (err, res, body) => {
    let features = JSON.parse(body);
    //features is an array of objects
    expect(typeof(features[0].features)).toBe('string');
    done();
  });
});

