const request = require('request')
const cheerio = require('cheerio')
const utils = require('./utils.js')

const oscarUrl = "https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse"

const options = {
    "term_in" : "202002",
    "subj_in" : "",
    "crse_in" : "",
    "schd_in" : "%"
}

function getCourses(qses) {
    options['subj_in'] = qses.subject
    options['crse_in'] = qses.id
    let promise = new Promise((res, rej) => {
        request({url: oscarUrl, qs: options}, (error, response) => {
            if(error) {
                rej(error) 
            } else {
                res(utils.scrapCourses(response.body))
            }
        }) 
    })
    return promise
}

function getSeats(courses) {
    let promises = []
    for(var i = 0; i < courses.length; i++) {
        const url = "https://oscar.gatech.edu" + courses[i].url
        promises.push(new Promise((res, rej) => {
            request({url: url}, (error, response) => {
                if(error) 
                    rej(error)
                else
                    res(utils.scrapInfo(response.body))
            })
        }))
    }
    return promises;
}

async function getCourseData(qses) {
    let courses = await getCourses(qses)
    let seats = await Promise.all(getSeats(courses))
    for(var i = 0; i < courses.length; i++) {
        courses[i].seats = seats[i]
    }
    return courses
}


module.exports = getCourseData
