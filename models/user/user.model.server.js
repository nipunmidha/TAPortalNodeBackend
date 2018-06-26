var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId,{password:0})
        .populate('school')
        .exec();
}

 // login=(credentials) => {
 //     return userModel.findOne(credentials,{password:0})
 //         .then(user => {
 //             if (!user || user._doc.type === "ADMIN") {
 //                 return user; }
 //             else {
 //                return userModel.findById(user._id,{password:0})
 //                     .populate('school')
 //                     .exec();
 //             }
 //         })
 //
 // }

login=(credentials)=>{

    return userModel.findOne(credentials,{password:0})
        .populate('school')
        .exec()
        .then(user => (user))
}

deleteUser=(userId)=>{
    userModel.deleteOne({_id:userId});
}

removeSchoolForUsers=(schoolId)=>{
    userModel.update({school:schoolId},{$set:{school:''}},{ multi: true})
}

var api={
    createUser:createUser,
    findAllUsers:findAllUsers,
    login:login,
    deleteUser:deleteUser,
    removeSchoolForUsers:removeSchoolForUsers,
    findUserById:findUserById
}

module.exports = api;