var mongoose = require('mongoose');

var applicantSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    type:String,
    school: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolModel' }
}, {collection: 'user'});
module.exports = applicantSchema;