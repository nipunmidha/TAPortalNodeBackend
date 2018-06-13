var mongoose = require('mongoose');
var studentSchema = require('./applicant.schema.server');
var studentModel = mongoose.model('ApplicantModel', studentSchema);

function createApplicant(user) {
    user.type="APPLICANT"
    return studentModel.create(user);
}

function findAllApplicants() {
    return studentModel.find({type:'APPLICANT'});
}

function findApplicantById(id) {
    return studentModel.findById(id);
}

updateUser=(id,user)=> (
    studentModel.findById(id)
        .then((oldUser) => {
                if (user.username)
                    oldUser.username = user.username
                if (user.password)
                    oldUser.password = user.password
                if (user.firstName)
                    oldUser.firstName = user.firstName
                if (user.lastName)
                    oldUser.lastName = user.lastName
                if (user.email)
                    oldUser.email = user.email
                studentModel.updateOne({id},oldUser);
                return oldUser;
            }
        )
)

var api={
    createApplicant:createApplicant,
    findAllApplicants:findAllApplicants,
    findApplicantById:findApplicantById,
    updateUser:updateUser
}



module.exports = api;