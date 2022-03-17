/*Adrian Posadas
301220353
03/06/2022
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/surveys');

/* GET surveys List page. READ */
router.get('/', (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/active', {
        title: 'Surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {
  res.render('surveys/details', {title: 'Add Survey', surveys: survey})  

});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {
  let newSurveys = survey({
      "Title": req.body.Title,
      "Date": req.body.Date,
      "Description": req.body.Description,
      "Question_1": req.body.Question_1,
      "Answer_1": req.body.Answer_1,
      "Question_2": req.body.Question_2,
      "Answer_2": req.body.Answer_2,
      "Question_3": req.body.Question_3,
      "Answer_3": req.body.Answer_3,
      
  });

  survey.create(newSurveys, (err, survey) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the survey list
          res.redirect('/')
      }
  })
});

// GET the Survey Details page in order to edit an existing Survey
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  survey.findById(id, (err, surveyToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // show the edit view
          res.render('surveys/details', {title: 'Edit Survey', surveys: surveyToEdit})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedSurvey = survey({
      "_id": id,
      "Title": req.body.Title,
      "Date": req.body.Date,
      "Description": req.body.Description,
      "Question_1": req.body.Question_1,
      "Answer_1": req.body.Answer_1,
      "Question_2": req.body.Question_2,
      "Answer_2": req.body.Answer_2,
      "Question_3": req.body.Question_3,
      "Answer_3": req.body.Answer_3,
  }); 

  survey.updateOne({_id: id}, updatedSurvey, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the survey list
          res.redirect('/')
      }
  });
});

// GET the Survey Details page in order to ANSWER an existing Survey
router.get('/answer/:id', (req, res, next) => {
  let id = req.params.id;

  survey.findById(id, (err, surveyToAnswer) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // show the edit view
          res.render('surveys/details', {title: 'Answer Survey', surveys: surveyToAnswer})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/answer/:id', (req, res, next) => {
  let id = req.params.id

  let answeredSurvey = survey({
      "_id": id,
      "Title": req.body.Title,
      "Date": req.body.Date,
      "Description": req.body.Description,
      "Question_1": req.body.Question_1,
      "Answer_1": req.body.Answer_1,
      "Question_2": req.body.Question_2,
      "Answer_2": req.body.Answer_2,
      "Question_3": req.body.Question_3,
      "Answer_3": req.body.Answer_3,
  }); 

  survey.updateOne({_id: id}, answeredSurvey, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the survey list
          res.redirect('/surveys')
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
          // refresh the survey list
          res.redirect('/')
      }
  });
});


module.exports = router;
