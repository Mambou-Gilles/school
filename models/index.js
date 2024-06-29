const dbConfig = require("../config/db.config")
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.courses = require('./courses.js')(mongoose);
db.students = require('./students.js')(mongoose);

module.exports = db;