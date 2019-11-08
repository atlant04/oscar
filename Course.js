const Section = require('./Section.js')

class Course {
    constructor(course){
        this.name = course.name
        this.fullName = course.data[0]
        const sections = Object.entries(course.data[1]);
        this.sections = sections.map(([name, sectionData]) => {
            return new Section(name, sectionData);
        })
    }
}

module.exports = Course