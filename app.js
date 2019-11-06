const http = require('http');
const express = require('express');
const scrapper = require('./scrapper/scrapper.js')
const { urlencoded } = require('body-parser');
const utils = require('./utils.js')
const db = require('./db.js')

var port = process.env.PORT || 3000;

require('dotenv').config()

//Initilizing global const
const app = express()

app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  var text = req.body.Body
  var options = {}
  var message;
  res.writeHead(200, {'Content-Type': 'text/xml'});

  if(isNaN(parseInt(text))) {
    text = text.split(' ')
    options.subject = text[0]
    options.id = text[1]
    scrapper(options)
      .then(courses => {
        console.log(courses)
        db.insert(courses)
        message = utils.generateMessage(courses, false)
        res.end(utils.compileMessage(message))
      })
      .catch(reason => {})
  } else {
    let course = db.find({crn: text.trim()}, (err, docs) => {
      message = utils.generateMessage(docs, true)
      res.end(utils.compileMessage(message))
    })
  }


});


http.createServer(app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
