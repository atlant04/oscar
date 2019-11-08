const Course = require("./Course.js")
const utils = require('./utils.js')
class Oscar {
    constructor(data) {
        this.courses = data.map((course) => {
           return new Course(course)
        })
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

    lookUpByName(name) {
        return this.courses.find(course => {
            return course.name == name
        })
    }
       
}
module.exports = Oscar
