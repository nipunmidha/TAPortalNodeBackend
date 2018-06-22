var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    type:String
}, {collection: 'user'});
module.exports = adminSchema;