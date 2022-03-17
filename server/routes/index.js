/*Adrian Posadas
301220353
03/06/2022
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let survey = require('../models/surveys');

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

module.exports = router;
