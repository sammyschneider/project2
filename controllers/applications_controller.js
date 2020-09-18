const express = require('express')
const Application = require('../models/applications.js')
const applications = express.Router()

// NEW
applications.get('/new', (req,res) => {
  res.render('applications/new.ejs')
})
// EDIT
applications.get('/:id/edit',(req,res) => {
  Application.findById(req.params.id, (error, foundApp) => {
    res.render('applications/edit.ejs', {
      application: foundApp
    })
  })
})
// DELETE
applications.delete('/:id', (req,res) => {
  Application.findByIdAndRemove(req.params.id, (error, deletedApp) => {
    res.redirect('/applications')
  })
})
//SHOW
applications.get('/:id', (req,res) => {
  Application.findById(req.params.id, (error, foundApp) => {
    res.render('applications/show.ejs', {
      application: foundApp
    })
  })
})
//UPDATE
applications.put('/:id', (req,res) => {
  Application.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, foundApp) => {
    res.redirect('/applications')
    })
  })
//CREATE
applications.post('/', (req,res) => {
  Application.create(req.body, (error, createdApp) => {
    res.redirect('/applications')
  })
})
//INDEX
applications.get('/', (req,res) => {
  Application.find({}, (error, allApps) => {
    res.render('applications/index.ejs', {
      applications: allApps
    })
  })
})

module.exports = applications;
