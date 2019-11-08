const MessagingResponse = require('twilio').twiml.MessagingResponse;
const parse = require('./parse.js')

function compileMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString()
}

async function generateMessageForCourse(course) {
    var message = ''
    message += course.name + "\n"
    message += course.fullName + "\n"
    for(var section of course.sections) {
        const seats = await parse(section.crn).then()
        message += '--------------------------\n'
        message += "Section: " + section.name + "\n"
        message += "Seats remaining: " + seats.seats.remaining + "\n"
        section.data[0].forEach(element => {
            message += element + "\n"
        });
    }
    return message
}

async function generateMessageForSection(section) {
    var message = ''
    const seats = await parse(section.crn).then()
    message += '--------------------------\n'
    message += "Section: " + section.name + "\n"
    message += "Seats remaining: " + seats.seats.remaining + "\n"
    section.data[0].forEach(element => {
        message += element + "\n"
     });
    return message
}

function isCrn(crn) {
    if(!isNaN(parseInt(crn)))
        return true
    else 
        return false
}



module.exports = {
    generateMessageForCourse,
    generateMessageForSection,
    isCrn
}
