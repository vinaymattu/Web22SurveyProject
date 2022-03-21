// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let survey = require('../models/surveys');
let login = require('../models/login');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Home',
        surveys: surveys
      });
    }
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register/register',{title:'register'});
});

router.post('/register', (req, res, next) => {
  let newUser = login({
      "username": req.body.username,
      "password": req.body.password      
  });

  login.create(newUser, (err, login) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the survey list
          res.redirect('/register')
      }
  })
});

module.exports = router;
