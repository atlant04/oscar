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
let oscar

const createOscar = () => {
    return new Promise((res, rej) => {
        getTermData("202002").then(data => {
            const courses = data['courses']
            const keys = Object.entries(courses);
            const parsedCourses = []
            for(const [key, data] of keys){
                parsedCourses.push({
                    name: key, 
                    data: data
                })
            } 
            res(new Oscar(parsedCourses))
        })
    })
}

const initOscar = async () => {
    if(oscar) {
        console.warn("Oscar has been initialized")
        //return callback(null, oscar)
    }
    return await createOscar()
} 


module.exports = {
    db,
    initOscar
};
