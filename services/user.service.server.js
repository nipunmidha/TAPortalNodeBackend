module.exports =(app) => {
    var userModel = require('../models/user/user.model.server')

    app.get('/api/user',findAllUsers)

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(users => res.send(users))
    }

    app.post('/api/login',login)

    function login(req, res) {
        userModel.login(req.body)
            .then((user)=>{
                if(user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                }
                else
                    res.status(401);
            })
    }

    app.post('/api/school/:id/user',createUser)

    function createUser(req, res) {
        var user= req.body;
        var id = req.params['id'];
        user.school=id;
        userModel.createUser(user)
             .then(user => res.send(user))
    }


    app.get('/api/profile', profile);
    function profile(req, res) {
        var user=req.session['currentUser'];
        if(user)
            userModel.findUserById(user._id)
                .then(user => res.send(user))
        else
            res.sendStatus(401);
    }



    app.delete('/api/user/:id',deleteUser)
    // Delete only from user collection
    function deleteUser(req, res) {
        var id = req.params['id'];
        userModel.deleteUser(id);
        res.sendStatus(200);
    }

}