const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Application = require('./applications.js')



const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: String,
  applications: [Application.schema]
})

// const Application = mongoose.model('Application', appSchema)
const User = mongoose.model('User', userSchema)

module.exports = User;

//////////////////////////////////////////

// const mongoose = require('mongoose');

// module.exports = Application;
