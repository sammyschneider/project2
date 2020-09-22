const express = require('express')
const Application = require('../models/applications.js')
const applications = express.Router()
const User = require('../models/users.js')

// MIDDLEWARE
const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/')
  }
}
//ABOUT
applications.get('/about', isAuthenticated, (req,res) => {
  res.render('applications/about.ejs',{
    currentUser: req.session.currentUser
  })
})
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
    User.findOne({username:req.session.currentUser.username}, (err,foundUser) => {
      foundUser.applications.id(req.params.id).remove();
      foundUser.save((err, data) => {
        res.redirect('/applications')
        console.log(data);
      })
    })
  })
})
//SHOW
applications.get('/:id', isAuthenticated, (req,res) => {
  Application.findById(req.params.id, (error, foundApp) => {
    res.render('applications/show.ejs', {
      application: foundApp,
      currentUser: req.session.currentUser
    })
    // console.log(foundApp.jobLink);
  })
})
//UPDATE
applications.put('/:id', (req,res) => {
  Application.findOneAndUpdate(req.params.id, req.body, {new:true}, (error, foundApp) => {
    User.findOne({username: req.session.currentUser.username}, (err, foundUser) => {

      // console.log(foundApp);
      foundUser.applications.id(req.params.id).remove()
      foundUser.applications.push(foundApp);
      foundUser.save((err,data) => {
          res.redirect('/applications')
          console.log(data);
      })
    })
  })
})
//CREATE
applications.post('/', (req,res) => {
  User.findOne({username:req.session.currentUser.username}, (err,foundUser) => {
    Application.create(req.body, (error, createdApp) => {
      foundUser.applications.push(createdApp);
      foundUser.save((err,data) => {
        res.redirect('/applications');
        // console.log(data);
        // console.log(data);
      })
    })
  })

})
//INDEX
applications.get('/', isAuthenticated, (req,res) => {
  User.findOne({username:req.session.currentUser.username}, (err,foundUser) => {
// console.log(foundUser.applications);
    // let something = foundUser.applications;
    console.log(foundUser);
    res.render('applications/index.ejs', {
        applications: foundUser,
        currentUser: req.session.currentUser
      })
    })
  })



module.exports = applications;
