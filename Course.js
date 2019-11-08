const Section = require('./Section.js')

class Course {
    constructor(name, data){
        this.name = name
        this.fullName = data[0]
        this.sections = Object.entries(data[1]).map(([name, sectionData]) => {
            return new Section(name, sectionData);
        })
    }
}

module.exports = Course