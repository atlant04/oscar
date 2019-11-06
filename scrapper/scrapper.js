const request = require('request')
const cheerio = require('cheerio')
const utils = require('./utils.js')

function getCourses(qses) {
    const url = "https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse"
    const options = {
        "term_in" : "202002",
        "subj_in" : qses.subject,
        "crse_in" : qses.id,
        "schd_in" : "%"
    }
    let promise = new Promise((res, rej) => {
        request({url: url, qs: options}, (error, response) => {
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

async function getCombinedCoursesAndSeats(qses) {
    let courses = await getCourses(qses)
    let seats = await Promise.all(getSeats(courses))
    for(var i = 0; i < courses.length; i++) {
        courses[i].seats = seats[i]
    }
    return courses
}

async function getCourseByCrn(crn) {
    const url = "https://oscar.gatech.edu/pls/bprod/bwckschd.p_disp_detail_sched"
    const options = {
        "term_in" : "202002",
        "crn_in" : crn
    }
    let promise = new Promise((res, rej) => {
        request({url: url, qs: options}, (error, response) => {
            if(error) {
                rej(error)
            } else {
                res(utils.scrapInfo(response.body))
            }
        })
    })
    return promise
}

async function getCourseData(qses) {
    var data;
    if(qses.crn) {
        data = await getCourseByCrn(qses.crn)
    } else if (qses.id) {
        data = await getCombinedCoursesAndSeats(qses)
    }
    return data
}

module.exports = getCourseData
