module.exports =(app) => {
    var typeModel = require('../models/applicant/applicant.model.server')

    app.get('/api/applicant',findAllUsers)

    function findAllUsers(req, res) {
        typeModel.findAllApplicants()
            .then(users => res.send(users))
    }

    app.get('/api/applicant/:id',findUserById)

    function findUserById(req, res) {
        var id = req.params['id'];
        typeModel.findApplicantById(id)
            .then(user => res.send(user))
    }

    app.post('/api/applicant',createUser)

    function createUser(req, res) {
        var user= req.body;
        typeModel.createApplicant(user)
            .then(user => res.send(user))
    }

    app.put('/api/applicant/:id',updateUser)

    function updateUser(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }

}