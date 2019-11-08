class Section {
    constructor(data){
        this.name = Object.keys(data)[0]
        this.crn = Object.values(data)[0]
    }
}

module.exports = Section