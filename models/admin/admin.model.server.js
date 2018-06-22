var mongoose = require('mongoose');
var adminSchema = require('./admin.schema.server');
var adminModel = mongoose.model('AdminModel', adminSchema);

function createAdmin(user) {
    user.type="ADMIN"
    return adminModel.create(user);
}

function findAllAdmins() {
    return adminModel.find({type:'ADMIN'},{password:0});
}

function findAdminById(id) {
    return adminModel.findById(id,{password:0});
}

deleteAdmin=(userId)=>{
    return adminModel.deleteOne({_id:userId});
}

checkEmailTaken = (email)=>{
    return adminModel.find({email:email});
}

updateUser=(id,user)=> (
   adminModel.update({_id:id},{$set:user})
)

var api={
    createAdmin:createAdmin,
    findAllAdmins:findAllAdmins,
    findAdminById:findAdminById,
    deleteAdmin:deleteAdmin,
    updateUser:updateUser,
    checkEmailTaken:checkEmailTaken
}



module.exports = api;