const MessagingResponse = require('twilio').twiml.MessagingResponse;

function compileMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString()
}

function generateMessage(courses, crn) {
    var message = ''
    for(course of courses) {
        if(course.attributes.schedule_type == "Lecture*") {
            message += '--------------------------\n'
            message += course.name + " has " + course.seats.regular + " seats remaining \n"
            if(crn) {
                message += "Time: " + course.attributes["time"] + "\n"
                message += "Days: " + course.attributes["days"] + "\n"
                message += "Professor: " + course.attributes["professor"] + "\n"
                message += "Location: " + course.attributes["location"] + "\n"
            }
        }
    }
    return message
}

module.exports = {
    generateMessage: generateMessage,
    compileMessage: compileMessage
}
