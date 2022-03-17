let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    
    Question_1: String,
    
    Question_2: String,
    
    Question_3: String,
    
},
{
  collection: "survey"
});

module.exports = mongoose.model('Survey', Survey);
