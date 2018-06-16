var mongoose = require('mongoose');
var instructorSchema = require('./instructor.schema.server');
var instructorModel = mongoose.model('InstructorModel', instructorSchema);

function createInstructor(user) {
    user.type="INSTRUCTOR"
    return instructorModel.create(user);
}

function findAllInstructors() {
    return instructorModel.find({type:'INSTRUCTOR',password:0})
        .populate('school')
        .exec();
}


function findInstructorById(id) {
    return instructorModel.findById(id,{password:0})
        .populate('school')
        .exec();
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
                if(user.school)
                    oldUser.school=user.school
                instructorModel.updateOne({_id:id},oldUser);
                return oldUser
            })
)

checkEmailTaken = (email)=> {
    return instructorModel.find({email: email}, function (err, users) {
            if (err) console.log(err)
            if (users.length)
                return true;
            else return false;
        }
    )
}

var api={
    createInstructor:createInstructor,
    findAllInstructors:findAllInstructors,
    findInstructorById:findInstructorById,
    updateUser:updateUser,
    checkEmailTaken:checkEmailTaken
}

module.exports = api;