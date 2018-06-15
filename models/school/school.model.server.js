var mongoose = require('mongoose');
var schoolSchema = require('./school.schema.server');
var schoolModel = mongoose.model('SchoolModel', schoolSchema);

function createSchool(school) {
    return schoolModel.create(school);
}

function findAllSchools() {
    return schoolModel.find();
}


function findSchoolById(id) {
    return schoolModel.findById(id);
}

function deleteSchool(id) {
    return schoolModel.deleteOne({_id:id});
}

// updateSchool=(id,school)=>(
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
//             instructorModel.updateOne({_id:id},oldUser);
//             return oldUser
//         })
// )

var api={
    createSchool:createSchool,
    findAllSchools:findAllSchools,
    findSchoolById:findSchoolById,
    deleteSchool:deleteSchool
}

module.exports = api;