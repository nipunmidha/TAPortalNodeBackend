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

// updateUser=(id,user)=>(
//     instructorModel.findById(id)
//         .then((oldUser)=>
//         {
//             if(user.username)
//                 oldUser.username=user.username
//             if(user.password)
//                 oldUser.password=user.password
//             if(user.firstName)
//                 oldUser.firstName=user.firstName
//             if(user.lastName)
//                 oldUser.lastName=user.lastName
//             if(user.email)
//                 oldUser.email=user.email
//             if(user.school)
//                 oldUser.school=user.school
//             instructorModel.updateOne({_id:id},oldUser);
//             return oldUser
//         })
// )

var api={
    createCourse:createCourse,
    findAllCourses:findAllCourses,
    findAllCoursesForSchool:findAllCoursesForSchool,
    findCourseById:findCourseById
}

module.exports = api;