const MessagingResponse = require('twilio').twiml.MessagingResponse;

function compileMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString()
}

function generateMessage(courses, crn) {
    var message = ''
    for(course of courses) {
        if(course.attributes["schedule_type"].includes("Lecture")) {
            console.log(course.name)
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

function isCrn(crn) {
    if(!isNaN(parseInt(crn)))
        return true
    else 
        return false
}

module.exports = {
    generateMessage,
    compileMessage,
    isCrn
}
