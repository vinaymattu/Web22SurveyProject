//Login model
let mongoose = require('mongoose');

let loginModel = mongoose.Schema({

    username:String,
    password:String    
},
{
    collection:"login"
});

module.exports = mongoose.model("Login",loginModel)