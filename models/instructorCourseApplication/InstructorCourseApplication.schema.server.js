var mongoose = require('mongoose');
const SEMESTER=["fall","spring","summer1","summer2","summer-full"]
var instructorCourse = mongoose.Schema({
        classStrength: Number,
        noOfTa: Number,
        taHired: { type: Number, default: 0 },
        syllabus:String,
        skillsMustNeeded:String,
        sectionName:String,
        semester:{type:String,enum:SEMESTER},
        year:Number,
        postionsFilled: { type: Boolean, default: false },
        courseCompleted: { type: Boolean, default: false },
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel'},
        instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'InstructorModel'}
        },
    {collection: 'instructorCourseApplication'});
module.exports = instructorCourse;