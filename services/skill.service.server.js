module.exports =(app) => {
    var skillModel = require('../models/skill/skill.model.server')


    app.get('/api/skill',findAllSkills)
    function findAllSkills(req, res) {
        skillModel.findAllSkills()
            .then(skills => res.send(skills))
    }


    app.get('/api/applicant/skills',findAllSkillsForApplicant)
    function findAllSkillsForApplicant(req, res) {
        var user=req.session['currentUser'];
        if(user && user.type==="APPLICANT")
            skillModel.findAllSkillsForApplicant(user._id)
                .then(skills => res.send(skills))
        else res.send(401);
    }


    app.get('/api/applicant/:id/skills',findAllSkillsForApplicantWithId)
    function findAllSkillsForApplicantWithId(req, res) {
        var id = req.params['id'];
        skillModel.findAllSkillsForApplicant(user._id)
            .then(skills =>
            {
                if(skills)
                    res.send(skills)
                else
                    res.send(400)


            })
    }


    app.get('/api/skill/:id',findSkillById)
    function findSkillById(req, res) {
        var id = req.params['id'];
        skillModel.findSkillById(id)
            .then(skill => res.send(skill))
    }


    app.post('/api/applicant/skill',createSkill)
    function createSkill(req, res) {
        var user=req.session['currentUser'];
        var skill= req.body;

        if(user && user.type==="APPLICANT")
        {
            skill.applicant=user._id;
            skillModel.createSkill(skill,user._id)
                .then(skill => res.send(skill))
        }
        else
            res.send(401);
    }


    app.put('/api/skill/:id',updateSkill)
    function updateSkill(req, res) {
        var id = req.params['id'];
        var skill= req.body;
        skillModel.updateSkill(id,skill)
            .then(skill => res.send(skill))
    }

    app.delete('/api/skill/:id',deleteSkill)
    function deleteSkill(req, res) {
        var id = req.params['id'];
        skillModel.deleteSkill(id)
    }

}