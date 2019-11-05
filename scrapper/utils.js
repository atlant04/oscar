const cheerio = require('cheerio')

const tags = {
    courseInfo: "td.dddefault",
    body: "table.datadisplaytable",
    name: "th.ddtitle",
}

function createAttributes(arr) {
    return {
        type : arr[0],
        time : arr[1],
        days : arr[2],
        location : arr[3],
        dates : arr[4],
        schedule_type : arr[5],
        professor : arr[6]
    }
}

let scrapCourses = data => {
    const $ = cheerio.load(data);
    const body = $(tags.body).first()

    const courses = findNames(body, $)
    const attributes = findInfo(body, $)

    for(var i = 0; i < courses.length; i++) {
        courses[i].attributes = createAttributes(attributes[i])
    }

    return courses
}

const findNames = (body, $) => {
    const courses = []
    body.find(tags.name).each((i, el) => {
        const name = $(el).text()
        const url = $(el).children().attr('href')
        courses.push({
            name: name,
            url: url
        })
    })

    return courses
}

const findInfo = (body, $) => {
    const attributes = []
    body.find(tags.courseInfo).each((i, el) => {
        if($(el).html() == 'Class') {
            const info = $(el).parent().find('.dddefault')
            const arr = []
            $(info).each((j, elem) => {
                arr.push($(elem).text())
            })
            attributes.push(arr)
        }
    })

    return attributes
}


let scrapInfo = data => {
    const $ = cheerio.load(data);
    const body = $(tags.body).get(1)
    const remaining = $($(body).find('td.dddefault').get(2)).html()
    const remaining_waitlist = $($(body).find('td.dddefault').get(5)).html()
    return {regular: remaining, waitlist: remaining_waitlist}
}

module.exports = {
    scrapCourses: scrapCourses,
    scrapInfo: scrapInfo
};