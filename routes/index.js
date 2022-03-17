var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let survey = require("../models/survey");

/* GET index page. */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('index', {
        title: 'Surveys',
        survey: survey
      });
    }
  });
});

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Home' });
});

router.post('/add', (req, res, next) => {

  let newSurvey = survey({
    "Question_1": req.body.q1,
    "Question_2":req.body.q2,
    "Question_3":req.body.q3
  });
  console.log(newSurvey);
  survey.create(newSurvey);
  res.redirect('/');

}); 

router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  survey.findById(id, (err, survey) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('add', {title: 'Update', survey:survey })
      }
  });
});

router.post('/:id', (req, res, next) => {

  let id = req.params.id
  let newSurvey = survey({
    "_id":id,
    "Question_1": req.body.q1,
    "Question_2":req.body.q2,
    "Question_3":req.body.q3
  });
  survey.updateOne({_id: id},newSurvey,(err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  survey.remove({_id: id}, (err) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
         res.redirect('/');
    }
});
});

module.exports = router;
