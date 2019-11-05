const http = require('http');
const express = require('express');
const scrapper = require('./scrapper/scrapper.js')
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  const text = req.body.Body.split(' ')
  const options = {
    subject: text[0],
    id: text[1]
  }

  scrapper(options).then(courses => {
    var message = ''
    for(course of courses) {
      if(course.attributes.schedule_type == "Lecture*") {
        message += '--------------------------\n'
        message += course.name + " has " + course.seats.regular + " seats remaining \n"
      }
    }
    twiml.message(message);
    console.log(message)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

  }).catch(reason => {
    twiml.message(reason);
    console.log(message)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  })
});


http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});

// scrapper(options).then(courses => {
//     console.log(courses)
// })



