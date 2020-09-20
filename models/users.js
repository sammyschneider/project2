const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Application = require('./applications.js')

const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: String
  // author: [Application.schema] //maybe Application
})

const User = mongoose.model('User', userSchema)

module.exports = User;
