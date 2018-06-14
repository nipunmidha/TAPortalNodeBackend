var mongoose = require('mongoose');

var applicantSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    resume:String,
    type:String
}, {collection: 'user'});
module.exports = applicantSchema;