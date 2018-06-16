module.exports =(app) => {
    var typeModel = require('../models/applicant/applicant.model.server')
    var skillModel = require('../models/skill/skill.model.server')


    app.get('/api/applicant',findAllUsers)
    function findAllUsers(req, res) {
        typeModel.findAllApplicants()
            .then(users => res.send(users))
    }


    app.get('/api/applicant/:id/profile',findUserById)
    function findUserById(req, res) {
        var id = req.params['id'];
        typeModel.findApplicantById(id)
            .then(user => res.send(user))
    }


    app.get('/api/applicant/profile',findUserProfile)
    function findUserProfile(req, res) {
        var user=req.session['currentUser'];
        if(user)
            typeModel.findApplicantById(user._id)
                .then(user => res.send(user))
        else
            res.sendStatus(401);
    }



    app.post('/api/school/:id/applicant',createUser)
    function createUser(req, res) {
        var id = req.params['id'];
        var bod= req.body;
        if(bod.password === bod.confirmPassword && !typeModel.checkEmailTaken(bod.email)) {
            var user={
                email:bod.email,
                password:bod.password,
                school:id
            }
            typeModel.createApplicant(user)
                .then(user => res.send(user))
        }
        else res.sendStatus(409);
    }


    app.put('/api/applicant/',updateUser)
    function updateUser(req, res) {
        var user=req.session['currentUser'];
        var newUser= req.body;
        typeModel.updateUser(user._id,newUser)
            .then(user => res.send(user))
    }


    app.put('/api/applicant/:id',updateUserById)
    function updateUserById(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }


    app.delete('/api/applicant/:id/',deleteUser)
        //Delete from the user as well as the skills collection as its composition
    function deleteUser(req, res) {
        var id = req.params['id'];
        skillModel.deleteAllSkillsForApplicant(id)
        typeModel.deleteApplicant(id)
            .then(res.sendStatus(200))
    }
}