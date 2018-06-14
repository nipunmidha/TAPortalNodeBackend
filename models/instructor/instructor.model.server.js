var mongoose = require('mongoose');
var instructorSchema = require('./instructor.schema.server');
var instructorModel = mongoose.model('InstructorModel', instructorSchema);

function createInstructor(user) {
    user.type="INSTRUCTOR"
    return instructorModel.create(user);
}

function findAllInstructors() {
    return instructorModel.find({type:'INSTRUCTOR'});
}


function findInstructorById(id) {
    return instructorModel.findById(id);
}

updateUser=(id,user)=>(
        instructorModel.findById(id)
            .then((oldUser)=>
            {
                if(user.username)
                    oldUser.username=user.username
                if(user.password)
                    oldUser.password=user.password
                if(user.firstName)
                    oldUser.firstName=user.firstName
                if(user.lastName)
                    oldUser.lastName=user.lastName
                if(user.email)
                    oldUser.email=user.email
                instructorModel.updateOne({_id:id},oldUser);
                return oldUser
            })
)

var api={
    createInstructor:createInstructor,
    findAllInstructors:findAllInstructors,
    findInstructorById:findInstructorById,
    updateUser:updateUser
}

module.exports = api;