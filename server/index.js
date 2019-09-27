const express = require('express');
const bodyParser = require('body-parser');
const {db, aboutGameFeatures} = require('../db/index.js');

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send('testing get request');
// });


app.get('/api/features', function (req, res){
  // console.log('testing get');
  // res.end();
  aboutGameFeatures(function(err, data){
    if(err){
      console.log(err)
    }else{
      res.send(JSON.stringify(data));
    }
  })
});

const port = 3003;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
