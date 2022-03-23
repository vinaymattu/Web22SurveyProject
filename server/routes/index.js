// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the game model
let survey = require('../models/surveys');
let login = require('../models/login');
let loginModel = login.loginModel;

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Home', 
        surveys: surveys, 
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
});

/* GET register page. */
//router.get('/register', function(req, res, next) {
//  res.render('register/register',{title:'register'});
//});
router.get('/register', function(req, res, next) {
  //check if user is not already logged in
  if(!req.user)
  {
      res.render('register/register',
      {
          title: 'Register',
          messages: req.flash('RegisterMessage')
      })
  }
  else
  {
      return res.redirect('/');
  }
});

/* POST register page. */
router.post('/register', (req, res, next) => {
  let newUser = new loginModel({
      username: req.body.username,
      //password: req.body.password,
      displayName: req.body.displayName      
  });

  loginModel.register(newUser, req.body.password, (err) => {
    if(err)
    {
        console.log("Errpr: Inserting New User");
        if(err.name == "UserExistsError")
        {
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'
            );
            console.log('Error: User Already Exists!')
        }
        return res.render('register/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage')
        });
    }
    else
    {
        return passport.authenticate('local')(req, res, () => {
            res.redirect('/surveys')
        });
    }
});
})

/*Added below content for login page*/


/* GET login page. */
//router.get('/login', function(req, res, next) {
 // res.render('register/login',{title:'login'});
//});

router.get('/login', function(req, res, next) {
  //Check if the user already Logged In
  if(!req.user)
  {
      res.render('register/login',
      {
          title:"Login",
          messages:req.flash('loginMessage')
      })
  }
  else
  {
       return res.redirect('/');
  }
});

router.post('/login', (req,res,next)=>{
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
});

router.get('/logout', performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;