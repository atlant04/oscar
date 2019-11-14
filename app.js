const http = require('http');
const express = require('express');
const scrapper = require('./scrapper/scrapper.js')
const { urlencoded } = require('body-parser');
const utils = require('./utils.js')
const db = require('./db.js')
require('dotenv').config()
const client = require('twilio')(process.env.SID, process.env.TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var port = process.env.PORT || 4000;
let notified = false;

function notify() {
  const section = Oscar.lookUp('31061')
  section.updateSeating().then(() => {
    var seat = parseInt(section.seats.seats.remaining)
    console.log(seat)
    if(seat > 0) {
      client.messages
      .create({body: 'Physics is open', from: '+18572565041', to: '+16176978599'})
      clearInterval(this)
    }
  })
}



//Initilizing global const
const app = express()
let Oscar
//db.loadCourseDatabase()

app.use(urlencoded({ extended: false }));

db.initOscar().then(oscar => {
  Oscar = oscar
  app.listen(port, console.log("Listening on port: " + port))
  setInterval(notify, 10000);
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