const http = require('http');
const express = require('express');
const scrapper = require('./scrapper/scrapper.js')
const { urlencoded } = require('body-parser');

var port = process.env.PORT || 3000;
const db = require('./db.js')
require('dotenv').config()

//Initilizing global const
const app = express()

app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/xml'});

  const text = req.body.body
  const options = {}
  if(parseInt(text) === NaN) {
    text = text.split(' ')
    options.subject = text[0],
    options.id = text[1]
  } else {
    options.crn = parseInt(text)
  }

  console.log(text)


  // scrapper(options)
  //   .then(courses => {
    
  //   })
  //   .catch(reason => {
  // })

});


http.createServer(app).listen(port, () => {
  console.log('Express server listening on port 3000');
});
