module.exports =(app) => {
    var typeModel = require('../models/school/school.model.server')
    var userModel = require('../models/user/user.model.server')

    // Only Admin
    app.get('/api/school',findAllSchools)
    function findAllSchools(req, res) {
        typeModel.findAllSchools()
            .then(schools => res.send(schools))
    }

    // Admin and Instructor
    app.post('/api/school',createSchool)
    function createSchool(req, res) {
        var school= req.body;
        if(school.name && school.emailDomain) {
            typeModel.createSchool(school)
                .then(school => res.send(school))
        } else
            res.sendStatus(400);

    }
    app.post('/api/school/search',searchSchool)
    function searchSchool(req, res) {
        var school= req.body;
        if(school.name) {
            typeModel.searchSchools(school.name)
                .then(resp => res.json(resp))
        } else
            res.sendStatus(400);

    }

    // Any one
    app.get('/api/school/:id/details',findSchoolById)
    function findSchoolById(req, res) {
        var id = req.params['id'];
        typeModel.findSchoolById(id)
            .then(school => res.send(school))
    }


    //Only Admin
    app.delete('/api/school/:id',deleteSchool)
    function deleteSchool(req, res) {
        var id = req.params['id'];
        typeModel.deleteSchool(id)
            .then(()=>userModel.removeSchoolForUsers(id))
            .then(res.sendStatus(200))
    }

    app.put('/api/school/:id',updateSchool)
    function updateSchool(req, res) {
        var id = req.params['id'];
        var school= req.body;
        typeModel.updateSchool(id,school)
            .then(user => res.send(school));
    }

    //
    // app.put('/api/instructor/',updateUser)
    // function updateUser(req, res) {
    //     var user=req.session['currentUser'];
    //     var newUser= req.body;
    //     typeModel.updateUser(user._id,newUser)
    //         .then(user => res.send(user))
    // }

}