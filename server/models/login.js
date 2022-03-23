//Login model
let mongoose = require('mongoose');
let plm = require('passport-local-mongoose');

let loginModel = mongoose.Schema({
    username: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    /*
    password: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    }
    */
    displayName:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created:
    {
        type: Date,
        default: Date.now
    },
    update:
    {
        type: Date,
        default: Date.now
    },
},
{
    collection:"login"
});

// configure options for User Model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

loginModel.plugin(plm, options);
module.exports.loginModel = mongoose.model('loginModel',loginModel)