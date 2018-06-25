var mongoose = require('mongoose');
var studentSchema = require('./applicant.schema.server');
var studentModel = mongoose.model('ApplicantModel', studentSchema);

function createApplicant(user) {
    user.type="APPLICANT"
    return studentModel.create(user);
}

function findAllApplicants() {
    return studentModel.find({type:'APPLICANT'},{password:0})
        .populate('school')
        .exec();
}

function findApplicantById(id) {
    return studentModel.findById(id,{password:0})
        .populate('school')
        .exec();
}

deleteApplicant=(userId)=>{
    return studentModel.deleteOne({_id:userId});
}

checkEmailTaken = (email)=>{
    return studentModel.find({email:email});
}

updateUser=(id,user)=> (
    studentModel.update({_id: id},{$set:user})
    // studentModel.findById(id)
    //     .then((oldUser) => {
    //             if (user.username)
    //                 oldUser.username = user.username
    //             if (user.password)
    //                 oldUser.password = user.password
    //             if (user.firstName)
    //                 oldUser.firstName = user.firstName
    //             if (user.lastName)
    //                 oldUser.lastName = user.lastName
    //             if (user.email)
    //                 oldUser.email = user.email
    //             if (user.resume)
    //                  oldUser.resume = user.resume
    //             if(user.school)
    //                  oldUser.school=user.school
    //             studentModel.updateOne({_id:id},oldUser);
    //             return oldUser;
    //         }
    //     )
)

updateRatings = (id, rating) => {
    return   studentModel.findOne({_id:id}).then(student => {
    var newRatinhg = (rating + (student.avgRating * student.rated)) / (1+ student.rated);
    var s ={avgRating: newRatinhg, rated: student.rated + 1}
    return studentModel.update({_id: id},{$set: s})});
}

var api={
    createApplicant:createApplicant,
    findAllApplicants:findAllApplicants,
    findApplicantById:findApplicantById,
    updateUser:updateUser,
    deleteApplicant:deleteApplicant,
    checkEmailTaken:checkEmailTaken,
    updateRatings: updateRatings
}



module.exports = api;