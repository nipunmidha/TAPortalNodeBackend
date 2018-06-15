var mongoose = require('mongoose');

var schoolSchema = mongoose.Schema({
    name: String,
    emailDomain: String,
    city: String,
}, {collection: 'school'});
module.exports = schoolSchema;