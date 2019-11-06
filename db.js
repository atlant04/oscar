const Datastore = require('nedb')
const db = new Datastore('database.db')
const scrapper = require('./scrapper/scrapper.js')

db.loadDatabase()
db.ensureIndex({fieldName: 'name', unique: true}, err => {}) //making courses unique by name

module.exports = db
