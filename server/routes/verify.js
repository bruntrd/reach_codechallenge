var express=require('express');
var router=express.Router();
var path=require('path');
var hours = require('./hours');
var index = require('./index');
var app=express();

var users = [
    'Ashley',
    'Dave',
    'Jim',
    'Ralph',
    'Jessica',
    'Mary'
];

var passwords = [
    '1234',
    'password',
    '12345',
    '12345678',
    'test',
    'admin'
];
var passOk = false;

//receiving user login info and sending back response
router.post('/', function(req,res,next){
    console.log(req.body);
    console.log('post hit');
    users.forEach(function(user, index) {
        if(user == req.body.name && req.body.password == passwords[index]) {
            passOk = true;
            console.log("true");
        }
        else {
            console.log("false");
        }
    });
    if (passOk === true){
        console.log("we are here");
        res.send('true');
    }
    else{
        console.log("nope we are here");
        res.send('false');
    }

});

module.exports = router;