const request = require('request')

function getTermData(term) {
    const url = `https://jasonpark.me/gt-schedule-crawler/${term}.json`
    return new Promise((res, rej) => {
        request({url: url, json: true}, (error, response) => {
            if(error) {
                rej(error)
            } else {
                res(response.body)
            }
        })
    })
}

module.exports = getTermData