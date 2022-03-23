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

/*Added below content for login page*/


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('register/login',{title:'login'});
});

module.exports.displayLoginPage =(req,res,next)=>{
  //Check if the user already Logged In
  if(!req.user)
  {
      res.render('register/login',
      {
          title:"Login",
          messages:req.flash('loginMessage'),
          displayName:req.user ? req.user.displayName:''
      })
  }
  else
  {
       return res.redirect('/');
  }
}

module.exports.processLoginPage=(req,res,next)=>{
  passport.authenticate('local',
  (err, user, info)=>{
      //server err?
      if(err)
      {
          return next(err);
      }
      //is there a user login error?
      if(!user)
      {
          req.flash('loginMessage','Authentication Error');
          return res.redirect('/login');
      }
      req.login(user,(err)=>{
          //server error?
          if(err)
          {
              return next(err);
          }
          return res.redirect('/surveys');
      });
  })(req,res,next);
}

module.exports = router;


