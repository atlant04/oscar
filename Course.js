const Section = require('./Section.js')

class Course {
    constructor(course){
        this.name = course.name
        this.fullName = course.data[0]
        const sections = Object.values(course.data[1]);
        this.sections = sections.map((sectionData) => {
            return new Section(sectionData);
        })
    }
}

module.exports = Course