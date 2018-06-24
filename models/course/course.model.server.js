var mongoose = require('mongoose');
var courseSchema = require('./course.schema.server');
var courseModel = mongoose.model('CourseModel', courseSchema);

function createCourse(course) {
    return courseModel.create(course);
}

function findAllCourses() {
    return courseModel.find()
        .populate('school')
        .sort('school')
        .exec();
}

function findAllCoursesForSchool(schoolId) {
    return courseModel.find({school:schoolId})
        .populate('school')
        .exec();
}


function findCourseById(id) {
    return courseModel.findById(id)
        .populate('school')
        .exec();
}

updateCourse=(id,user)=>(
    courseModel.update({_id: id},{$set: user})
)
deleteCourse=(id)=>(
    courseModel.remove({_id:id})
)
searchCourse = (course, id) =>{
     return courseModel.find().and([
         { $or:[
             {name: {
            "$regex": course,
            "$options": "i"}},
            {courseNumber: {
             "$regex": course,
             "$options": "i"
                }
            }]
         }, {school: id}    ]
     );
}

var api={
    createCourse:createCourse,
    findAllCourses:findAllCourses,
    findAllCoursesForSchool:findAllCoursesForSchool,
    findCourseById:findCourseById,
    updateCourse: updateCourse,
    deleteCourse: deleteCourse,
    searchCourse:searchCourse

}

module.exports = api;