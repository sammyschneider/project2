const express = require('express')
const Application = require('../models/applications.js')
const applications = express.Router()
const User = require('../models/users.js')
const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}
// NEW
applications.get('/new', isAuthenticated, (req,res) => {
  res.render('applications/new.ejs', {
      currentUser: req.session.currentUser
    })
})
// EDIT
applications.get('/:id/edit',(req,res) => {
  Application.findById(req.params.id, (error, foundApp) => {
    res.render('applications/edit.ejs', {
      application: foundApp,
      currentUser: req.session.currentUser
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
applications.get('/:id', isAuthenticated, (req,res) => {
  Application.findById(req.params.id, (error, foundApp) => {
    res.render('applications/show.ejs', {
      application: foundApp,
      currentUser: req.session.currentUser
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
applications.get('/', isAuthenticated, (req,res) => {
  Application.find({}, (error, allApps) => {
    res.render('applications/index.ejs', {
      applications: allApps,
      currentUser: req.session.currentUser
    })
  })
})

module.exports = applications;
