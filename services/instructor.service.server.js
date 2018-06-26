module.exports =(app) => {
    var typeModel = require('../models/instructor/instructor.model.server')
    var userModel = require('../models/user/user.model.server')


    app.get('/api/instructor',findAllUsers)
    function findAllUsers(req, res) {
        typeModel.findAllInstructors()
            .then(users => res.json(users))
    }


    app.post('/api/school/:id/instructor',createUser)
    function createUser(req, res) {
        var id = req.params['id'];
        var bod = req.body;
        var curUser = req.session['currentUser'];
        if (bod.password === bod.confirmPassword) {
            typeModel.checkEmailTaken(bod.email)
                .then(rep => {
                    if (rep.length === 0) {
                        var user = {
                            email: bod.email,
                            password: bod.password,
                            firstName: bod.firstName,
                            lastName: bod.lastName,
                            school: id
                        }
                        typeModel.createInstructor(user)
                            .then(() => {
                                if (!curUser || curUser.type !== 'ADMIN') {
                                    userModel.login({email: user.email, password: user.password})
                                        .then((user) => req.session['currentUser'] = user)
                                        .then(() => res.json(user))
                                }
                            })
                    }
                    else res.sendStatus(401);
                })
        } else res.sendStatus(400);
    }


    // app.get('/api/instructor/:id/profile',findUserById)
    // function findUserById(req, res) {
    //     var id = req.params['id'];
    //     typeModel.findInstructorById(id)
    //         .then(user => res.send(user))
    // }


    app.put('/api/instructor/:id',updateUserById)
    function updateUserById(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }

    app.delete('/api/instructor/:id',deleteUser)
    function deleteUser(req, res) {
        var id = req.params['id'];
        typeModel.deleteIns(id)
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