module.exports =(app) => {
    var typeModel = require('../models/instructorCourseApplication/instructorCourseApplication.model.server')


    app.get('/api/ica',findAllIca)
    function findAllIca(req, res) {
        typeModel.findAllIca()
            .then(icas => res.send(icas))
    }

    app.get('/api/school/:id/ica',findAllIcaForSchool)
    function findAllIcaForSchool(req, res) {
        var id = req.params['id'];
        typeModel.findAllIca()
            .then(icas => {
                res.json(icas.filter(ica => ica.school._id === id));
            })
    }
    // app.get('/api/applicant/ica',findAllIcaForApplicant)
    // function findAllIcaForApplicant(req, res) {
    //     var user=req.session['currentUser'];
    //     var id = user.school._id;
    //     typeModel.findAllIca()
    //         .then(icas => {
    //             res.json(icas.filter(ica => ica.school._id === id));
    //         })
    // }
    app.get('/api/course/:id/ica',findAllIcasForCourse)
    function findAllIcasForCourse(req, res) {
        var id = req.params['id'];
        typeModel.findAllIcaForCourse(id)
            .then(ica => res.send(ica))
    }

    app.get('/api/instructor/ica',findAllIcasForInstructor)
    function findAllIcasForInstructor(req, res) {
        var user=req.session['currentUser'];

        if(user && user.type==="INSTRUCTOR")
        {
            typeModel.findAllIcaForInstructor(user._id)
                .then(icas =>
                {
                    if(icas.length>0)
                        res.send(icas)
                    else
                        res.sendStatus(404)})
            }
            else
            res.sendStatus(401);
    }

    app.post('/api/instructor/course/:id',createICA)
    function createICA(req, res) {
        var ica= req.body;
        var courseId = req.params['id'];
        var user=req.session['currentUser'];
        if(user && user.type==="INSTRUCTOR") {
            ica.course = courseId;
            ica.instructor=user._id;
            typeModel.createIca(ica)
                .then(course => res.send(course))
        } else
            res.sendStatus(401);

    }


    app.get('/api/ica/:id/details',findIcaById)
    function findIcaById(req, res) {
        var id = req.params['id'];
        typeModel.findIcaById(id)
            .then(ica => res.send(ica))
    }

    app.get('/api/ica/:id/updateCourseCompleted?:status',updateCourseCompleted)
    function updateCourseCompleted(req, res) {
        var id = req.params['id'];
        var status=req.query.status;
        typeModel.updateCourseCompleted(id,status)
            .then(course => res.send(course))
    }

    app.put('/api/ica/:id/updatePositionFilled?:status',updatePositionFilled)
    function updatePositionFilled(req, res) {
        var id = req.params['id'];
        var status=req.query.status;
        typeModel.updatePosstionFilled(id,status)
            .then(course => res.send(course))
    }

    app.put('/api/ica/:id',updateIca)
    function updateIca(req, res) {
        var id = req.params['id'];
        var ica= req.body;
        typeModel.updateIca(id,ica)
            .then(ica => res.send(ica))
    }

    app.delete('/api/ica/:id', deleteIca)
    function deleteIca(req, res) {
        var id = req.params['id'];
        typeModel.deleteIca(id)
            .then(ica => res.send(ica))
    }

}