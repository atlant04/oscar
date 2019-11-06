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
  const text = req.body.body
  const options = {}
  console.log(text)
  if(parseInt(text) === NaN) {
    text = text.split(' ')
    options.subject = text[0],
    options.id = text[1]
  } else {
    options.crn = parseInt(text)
  }


  // scrapper(options)
  //   .then(courses => {
    
  //   })
  //   .catch(reason => {
  // })

  res.writeHead(200, {'Content-Type': 'text/xml'});
});


http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
