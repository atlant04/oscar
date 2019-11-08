const Course = require("./Course.js")
const utils = require('./utils.js')
class Oscar {
    constructor(data) {
        const { courses, dateRanges, scheduleTypes, campuses } = data;
        this.courses = Object.entries(courses).map(([name, data]) => new Course(name, data))
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
        }
    }

    async generateMessage(item) {
        if(item instanceof Course) {
            let message = utils.generateMessageForCourse(item)
            let messages = item.sections.map(section => {
                if(this.isLecture(section)) {
                    return utils.generateMessageForSection(section)
                }
            })
            return Promise.all(messages).then(messages => {
                let message = ''
                messages.forEach(m => {
                  message += m
                })
                return message
            })
        } else {
            return utils.generateMessageForSection(item);
        }
    }

    lookUpByName(name) {
        return this.courses.find(course => {
            return course.name == name
        })
    }
       
}
module.exports = Oscar
