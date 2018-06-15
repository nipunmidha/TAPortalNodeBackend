module.exports =(app) => {
    var typeModel = require('../models/instructor/instructor.model.server')


    app.get('/api/instructor',findAllUsers)
    function findAllUsers(req, res) {
        typeModel.findAllInstructors()
            .then(users => res.send(users))
    }


    app.post('/api/school/:id/instructor',createUser)
    function createUser(req, res) {
        var user= req.body;
        var id = req.params['id'];
        user.school=id;
        typeModel.createInstructor(user)
            .then(user => res.send(user))
    }


    app.get('/api/instructor/:id/profile',findUserById)
    function findUserById(req, res) {
        var id = req.params['id'];
        typeModel.findInstructorById(id)
            .then(user => res.send(user))
    }


    app.put('/api/instructor/:id',updateUserById)
    function updateUserById(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }


    app.put('/api/instructor/',updateUser)
    function updateUser(req, res) {
        var user=req.session['currentUser'];
        var newUser= req.body;
        typeModel.updateUser(user._id,newUser)
            .then(user => res.send(user))
    }

}