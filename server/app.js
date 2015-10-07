var express=require('express');
var path=require('path');
var app = express();
var index= require('./routes/index');
var verify = require('./routes/verify');
var hours = require('./routes/hours');




var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));


app.set("port", (process.env.PORT || 5000));


app.use("/hours", hours);
app.use("/verify", verify);
app.use("/", index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
