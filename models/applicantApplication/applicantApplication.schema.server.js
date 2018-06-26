var mongoose = require('mongoose');
const RATING=[1,2,3,4,5]
var applicantApplication = mongoose.Schema({
        isSelected:  { type: Boolean, default: false },
        instructorRemarks: String,
            instructorRating:{type:Number,enum:RATING},
        applicant: {type: mongoose.Schema.Types.ObjectId, ref: 'ApplicantModel'},
        position: {type: mongoose.Schema.Types.ObjectId, ref: 'InstructorCourseModel' }
    },
    {collection: 'applicantApplication'});
module.exports = applicantApplication;