const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  companyName: {type: String, required: true},
  jobTitle: String,
  location: String,
  jobLink: String,
  desired: {type: Number, max:5, min:0},
  date: {type:Date, default: Date.now()}
})

const Application = mongoose.model('Application', appSchema)

module.exports = Application;
