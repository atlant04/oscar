const MessagingResponse = require('twilio').twiml.MessagingResponse;
const parse = require('./parse.js')

function compileMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString()
}

function generateMessageForCourse(course) {
    var message = ''
    message += course.name + "\n"
    message += course.fullName + "\n"
    message += generateMessageForSections(course.name, course.sections)
    return message
}

function generateMessageForSection(section) {
    var message = ''
    seats = section.seats
    message += "Section: " + section.name + "\n"
    message += "CRN: " + section.crn + "\n"
    Object.values(section.meetings[0]).forEach(meeting => {
        message += meeting + "\n"
    })
    message += "Seats remaining: " + seats.seats.remaining + "\n"
    message += "Seats remaining on waitlist: " + seats.waitlist.remaining + "\n"
    return message
}

function generateMessageForSections(name, sections) {
    var message = ''
    sections.forEach(section => {
        if(section.isLecture) {
            message += '--------------------------\n'
            message += name + "\n"
            message += generateMessageForSection(section)
        }
    })
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
