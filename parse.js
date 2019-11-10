const request = require('request')

const parse = async crn => {
    const url = 'https://oscar.gatech.edu/pls/bprod/bwckschd.p_disp_detail_sched?term_in=202002&crn_in=' + crn
    return new Promise((res, rej) => {
        request({url: url}, (error, response) => {
            if(error) {
                rej(error)
            } else {
                res(parseHtml(response.body))
            }
        })
    })
}

const parseHtml = html => {
    const startIndex = html.indexOf('<caption class="captiontext">Registration Availability</caption>');
    const body = html.slice(startIndex);
    const endIndex = body.indexOf('</table>'); 
    const info = body.slice(0, endIndex).split('dddefault">').slice(1)
    const data = []
    info.forEach(str => {
        const seats = []
        const index = str.indexOf("<");
        const seat = str.slice(0, index)
        data.push(seat)
    })
    return seats = {
        seats: {
            capacity: data[0],
            actual: data[1],
            remaining: data[2]
        },
        waitlist: {
            capacity: data[3],
            actual: data[4],
            remaining: data[5]
        }
    }
}
module.exports = parse

