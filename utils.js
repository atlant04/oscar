const MessagingResponse = require('twilio').twiml.MessagingResponse;

function compileMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString()
}

function generateMessage(courses) {
    var message = ''
    for(course of courses) {
        if(course.attributes.schedule_type == "Lecture*") {
            message += '--------------------------\n'
            message += course.name + " has " + course.seats.regular + " seats remaining \n"
        }
    }
    return message
}

module.exports = {
    generateMessage: generateMessage,
    compileMessage: compileMessage
}
