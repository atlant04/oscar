const Datastore = require('nedb')
const db = new Datastore('database.db')
const users = new Datastore('users.db')
const getTermData = require('./getTermData.js')
const utils = require('./utils.js')
const Oscar = require('./Oscar.js')

db.loadDatabase()
db.ensureIndex({fieldName: 'name', unique: true}, err => {}) //making courses unique by name
users.loadDatabase()
users.ensureIndex({fieldName: 'number', unique: true}, err => {}) 

const loadCourseDatabase = () => {
    getTermData("202002").then(data => {
        const courses = data['courses']
        const keys = Object.keys(courses);
        for(key of keys){
            const course = {
                name: key, 
                data: courses[key]
            }
            db.insert(course, (error, doc) => {
                if(error) {
                   // console.log(error)
                }
            })
        }
    })
}

const getOscar = async () => {
    return new Promise((res, rej) => {
        db.find({}, (error, docs) => {
            res(new Oscar(docs))
        })
    })
}

getOscar().then(oscar => {
    console.log(oscar.lookUp("41275"))
})

module.exports = {
    db,
    getOscar
};
