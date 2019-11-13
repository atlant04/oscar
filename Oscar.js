const Course = require("./Course.js")
const utils = require('./utils.js')
const parse = require('./parse.js')

class Oscar {
    constructor(data) {
        const { courses, dateRanges, scheduleTypes, campuses } = data;
        this.courses = Object.entries(courses).map(([name, data]) => new Course(scheduleTypes, name, data))
        this.scheduleTypes = scheduleTypes
        this.dateRanges = dateRanges
        this.campuses = campuses
    }

    lookUp(identifier) {
        if(utils.isCrn(identifier)) {
            return this.lookUpByCrn(identifier)
        } else {
            return this.lookUpByName(identifier)
        }
    }
    
    lookUpByCrn(crn) {
        for(var i = 0; i < this.courses.length; i++) {
            var sections = this.courses[i].sections
            for(var j = 0; j < sections.length; j++) {
                if(sections[j].crn == crn) {
                    return sections[j]
                }

            }
        }
    }

    isLecture(section) {
        if(this.scheduleTypes[section.scheduleTypeIndex] == "Lecture*") {
            return true
        } else {
            return false
        }
    }

    generateMessage(item) {
        if(item instanceof Course) {
            return utils.generateMessageForCourse(item)
        } else {
            return utils.generateMessageForSection(item)
        }
    }

    update(course) {
        var seatsArray = course.sections.map(section => { 
            return section.updateSeating()
        })
        return Promise.all(seatsArray)
    }

    lookUpByName(name) {
        return this.courses.find(course => {
            return course.name == name
        })
    }
       
}
module.exports = Oscar
