const Section = require('./Section.js')

class Course {
    constructor(scheduleTypes, name, data){
        this.name = name
        this.fullName = data[0]
        this.sections = Object.entries(data[1]).map(([name, sectionData]) => {
            return new Section(name, sectionData);
        })
        this.sections.forEach(section => {
            let type = scheduleTypes[section.scheduleTypeIndex]
            section.isLecture = type == "Lecture*" ? true : false;
        })
    }
}

module.exports = Course