module.exports =(app) => {
    var typeModel = require('../models/instructor/instructor.model.server')

    app.get('/api/instructor',findAllUsers)

    function findAllUsers(req, res) {
        typeModel.findAllInstructors()
            .then(users => res.send(users))
    }

    app.post('/api/instructor',createUser)

    function createUser(req, res) {
        var user= req.body;
        typeModel.createInstructor(user)
            .then(user => res.send(user))
    }

    app.get('/api/instructor/:id',findUserById)

    function findUserById(req, res) {
        var id = req.params['id'];
        typeModel.findInstructorById(id)
            .then(user => res.send(user))
    }

    app.put('/api/instructor/:id',updateUser)

    function updateUser(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }


}