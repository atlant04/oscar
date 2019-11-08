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
       
}
module.exports = Oscar
