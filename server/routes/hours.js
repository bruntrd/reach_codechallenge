var express=require('express');
var router=express.Router();
var path=require('path');

var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);


var sqlite3 = require('sqlite3').verbose();

//If you'd like to save the data use file instead of 'memory'
//var db = new sqlite3.Database(file);
var db = new sqlite3.Database(':memory:');

//create database
db.serialize(function() {
    db.run("CREATE TABLE hours (monday INT default 0, tuesday INT default 0, wednesday INT default 0, thursday INT default 0, friday INT default 0, saturday INT default 0, sunday INT default 0)");
});


//accepting hours from post and inserting into db
router.post("/save", function(req,res,next){
    console.log(req.body);
    console.log('post hit');
        console.log(req.body.Monday);
        db.run('INSERT INTO HOURS(sunday) VALUES("' + req.body.Sunday + '")');
        db.run('INSERT INTO HOURS(monday) VALUES("' + req.body.Monday + '")');
        db.run('INSERT INTO HOURS(tuesday) VALUES("' + req.body.Tuesday + '")');
        db.run('INSERT INTO HOURS(wednesday) VALUES("' + req.body.Wednesday + '")');
        db.run('INSERT INTO HOURS(thursday) VALUES("' + req.body.Thursday + '")');
        db.run('INSERT INTO HOURS(friday) VALUES("' + req.body.Friday + '")');
        db.run('INSERT INTO HOURS(saturday) VALUES("' + req.body.Saturday + '")');
        db.get("SELECT rowid AS id, monday FROM hours", function(err, row) {
            console.log(row.id + ": " + row.monday);
        });


});



//catch all for hours.html

router.get("/*", function(req, res, next){
    var file=req.params[0] || 'assets/views/hours.html';
    res.sendFile(path.join(__dirname, "../public",file));
});

module.exports = router;