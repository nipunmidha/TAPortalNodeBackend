module.exports =(app) => {
    var typeModel = require('../models/school/school.model.server')
    var userModel = require('../models/user/user.model.server')

    app.get('/api/school',findAllSchools)
    function findAllSchools(req, res) {
        typeModel.findAllSchools()
            .then(schools => res.send(schools))
    }


    app.post('/api/school',createSchool)
    function createSchool(req, res) {
        var school= req.body;
        typeModel.createSchool(school)
            .then(school => res.send(school))
    }


    app.get('/api/school/:id/details',findSchoolById)
    function findSchoolById(req, res) {
        var id = req.params['id'];
        typeModel.findSchoolById(id)
            .then(school => res.send(school))
    }


    app.delete('/api/school/:id',deleteSchool)
    function deleteSchool(req, res) {
        var id = req.params['id'];
        typeModel.deleteSchool(id)
            .then(()=>userModel.removeSchoolForUsers(id))
            .then(res.sendStatus(200))
    }
    // app.put('/api/school/:id',updateUserById)
    // function updateUserById(req, res) {
    //     var id = req.params['id'];
    //     var user= req.body;
    //     typeModel.updateUser(id,user)
    //         .then(user => res.send(user))
    // }

    //
    // app.put('/api/instructor/',updateUser)
    // function updateUser(req, res) {
    //     var user=req.session['currentUser'];
    //     var newUser= req.body;
    //     typeModel.updateUser(user._id,newUser)
    //         .then(user => res.send(user))
    // }

}