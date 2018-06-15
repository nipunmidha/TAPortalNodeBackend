var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    school: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolModel' }
}, {collection: 'user'});
module.exports = userSchema;