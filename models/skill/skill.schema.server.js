var mongoose = require('mongoose');

const PROFICIENCY=["novice","intermediate","expert"]

var skillSchema = mongoose.Schema({
    name: String,
    proficiency: {type:String, enum:PROFICIENCY},
    applicant: {type: mongoose.Schema.Types.ObjectId, ref: 'ApplicantModel' }
}, {collection: 'skill'});
module.exports = skillSchema;