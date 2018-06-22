module.exports =(app) => {
    var typeModel = require('../models/admin/admin.model.server')


    app.get('/api/admin',findAllUsers)
    function findAllUsers(req, res) {
        typeModel.findAllAdmins()
            .then(users => res.send(users))
    }


    app.get('/api/admin/:id/profile',findUserById)
    function findUserById(req, res) {
        var id = req.params['id'];
        typeModel.findAdminById(id)
            .then(user => res.send(user))
    }


    app.get('/api/admin/profile',findUserProfile)
    function findUserProfile(req, res) {
        var user=req.session['currentUser'];
        if(user)
            user => res.send(user);
        else
            res.sendStatus(401);
    }



    app.post('/api/admin',createUser)
    function createUser(req, res) {
        var id = req.params['id'];
        var bod= req.body;
        if(bod.password === bod.confirmPassword ) {
            typeModel.checkEmailTaken(bod.email)
                .then(rep =>
                {
                    if(rep.length === 0)
                    {
                        var user={
                            email:bod.email,
                            password:bod.password
                        }
                        typeModel.createAdmin(user)
                            .then(user => res.send(user))
                    }
                    else res.sendStatus(409);
                })

        }
        else res.sendStatus(401);
    }


    app.put('/api/admin/',updateUser)
    function updateUser(req, res) {
        var user=req.session['currentUser'];
        var newUser= req.body;
        typeModel.updateUser(user._id,newUser)
            .then(user => res.send(user))
    }


    app.put('/api/admin/:id',updateUserById)
    function updateUserById(req, res) {
        var id = req.params['id'];
        var user= req.body;
        typeModel.updateUser(id,user)
            .then(user => res.send(user))
    }


    app.delete('/api/admin/:id/',deleteUser)
    //Delete from the user as well as the skills collection as its composition
    function deleteUser(req, res) {
        var id = req.params['id'];
        typeModel.deleteAdmin(id)
            .then(res.sendStatus(200))
    }
}