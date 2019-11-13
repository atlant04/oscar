const http = require('http');
const express = require('express');
const scrapper = require('./scrapper/scrapper.js')
const { urlencoded } = require('body-parser');
const utils = require('./utils.js')
const db = require('./db.js')
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var port = process.env.PORT || 3000;
let notified = false;


//Initilizing global const
const app = express()
let Oscar
//db.loadCourseDatabase()

app.use(urlencoded({ extended: false }));

db.initOscar().then(oscar => {
  Oscar = oscar
  app.listen(port, console.log("Listening on port: " + port))
})


app.post('/sms', (req, res) => {
  var text = req.body.Body

  const course = Oscar.lookUp(text)
  Oscar.update(course).then(() => {
    const message = Oscar.generateMessage(course)
    const twiml = new MessagingResponse();
    twiml.message(message);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    res.end(message);
  })
  
});

app.post("/section", (req, res) => {
  const section = Oscar.lookUp(req.body.crn)
  section.updateSeating().then(() => {
    res.end(JSON.stringify(section.seats))
  })
}) 