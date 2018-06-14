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
    return userModel.findById(userId);
}

 login=(credentials)=>{

    return userModel.findOne(credentials,{password:0});
 }

deleteUser=(userId)=>{
    userModel.deleteOne(userId);
}


var api={
    createUser:createUser,
    findAllUsers:findAllUsers,
    login:login,
    deleteUser:deleteUser
}

module.exports = api;