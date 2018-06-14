var mongoose = require('mongoose');
var skillsSchema = require('./skill.schema.server');
var skillModel = mongoose.model('SkillModel', skillsSchema);

function createSkill(skill) {
    return skillModel.create(skill);
}

function findAllSkillsForApplicant(id) {
    return skillModel.find({applicant:id});
}

function findAllSkills() {
    return skillModel.find();
}

function findSkillById(id) {
    return skillModel.findById(id);
}

updateSkill=(id,skill)=>(
    skillModel.findById(id)
        .then((oldSkill)=>
        {
            if(skill.name)
                oldSkill.name=user.name
            if(skill.proficiency)
                oldSkill.proficiency=user.proficiency
            skillModel.updateOne({_id:id},oldUser);
            return oldSkill
        })
)

deleteSkill=(skilId)=>{
    skillModel.deleteOne(skilId);
}

deleteAllSkillsForApplicant=(applcantId)=>{
    skillModel.deleteMany({applicant:applcantId});
}


var api={
    createSkill:createSkill,
    findAllSkillsForApplicant:findAllSkillsForApplicant,
    findSkillById:findSkillById,
    updateSkill:updateSkill,
    deleteSkill:deleteSkill,
    deleteAllSkillsForApplicant:deleteAllSkillsForApplicant,
    findAllSkills:findAllSkills
}

module.exports = api;