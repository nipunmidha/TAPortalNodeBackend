var mongoose = require('mongoose');

var applicantSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    resume:String,
    type:String,
    rated:  { type: Number, default: 0 },
    avgRating:  { type: Number, default: 5 },
    school: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolModel' }
}, {collection: 'user'});
module.exports = applicantSchema;