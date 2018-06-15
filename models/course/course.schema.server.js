var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    name: String,
    courseNumber: String,
    school: {type: mongoose.Schema.Types.ObjectId, ref: 'SchoolModel' }},
    {collection: 'user'});
module.exports = courseSchema;