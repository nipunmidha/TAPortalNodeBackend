var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

mongoose.connect(process.env.M_URL,function (err){
    if (err) throw err;
    console.log('Successfully connected');
});

var app = express()

// For cross-origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Session
var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


//Service Calls
require('./services/user.service.server')(app);
require('./services/applicant.service.server')(app);
require('./services/instructor.service.server')(app);
require('./services/skill.service.server')(app);
require('./services/school.service.server')(app);
require('./services/course.service.server')(app);
require('./services/ica.service.server')(app);
require('./services/admin.service.server')(app);
app.listen(process.env.PORT ||3000)