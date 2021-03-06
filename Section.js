const parse = require("./parse.js")

class Section {
    constructor(name, data){
        const [crn, meetings, credits, scheduleTypeIndex, campusIndex] = data;
        this.name = name
        this.crn = crn
        this.meetings = meetings.map(([period, days, where, instructors, dateRangeIndex]) => ({
            period: period === 'TBA' ? undefined : period,
            days: days === '&nbsp;' ? [] : [...days],
            where,
            instructors: instructors.map(instructor => instructor.replace(/ \(P\)$/, ''))
          }))
        this.credits = credits
        this.scheduleTypeIndex = scheduleTypeIndex
        this.campusIndex = campusIndex
        this.isLecture = false;
        this.seats = null;
    }

    updateSeating() {
        return parse(this.crn).then(seats => this.seats = seats)
    }
}

module.exports = Section