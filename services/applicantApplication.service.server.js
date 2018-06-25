module.exports =(app) => {
    var typeModel = require('../models/applicantApplication/applicantApplication.model.server')
    var icaModel = require('../models/instructorCourseApplication/instructorCourseApplication.model.server')
    var studentModel = require('../models/applicant/applicant.model.server')

    app.get('/api/aa',findAllApplicantApplications)
    function findAllApplicantApplications(req, res) {
        typeModel.findAllApplicantApplications()
            .then(icas => res.send(icas))
    }

    app.get('/api/ica/:id/aa',findAllApplicationsForPostion)
    function findAllApplicationsForPostion(req, res) {
        var id = req.params['id'];
        typeModel.findAllApplicantApplicationsForPostion(id)
            .then(aa => res.send(aa))
    }

    app.get('/api/applicant/aa',findAllApplicationsForApplicant)
    function findAllApplicationsForApplicant(req, res) {
        var user=req.session['currentUser'];

        if(user && user.type==="APPLICANT")
        {
            typeModel.findAllAppliedApplicationsForApplicant(user._id)
                .then(aa =>
                {
                    if(aa.length>0)
                        res.send(aa)
                    else
                        res.json([])})
        }
        else
            res.sendStatus(401);
    }

    app.get('/api/applicant/:id/aa',findAllApplicationsForApplicantbyId)
    function findAllApplicationsForApplicantbyId(req, res) {
        var id = req.params['id'];
        typeModel.findAllAppliedApplicationsForApplicant(id)
                .then(aa =>
                {
                    if(aa.length>0)
                        res.send(aa)
                    else
                        res.json([])
                })

    }

    app.post('/api/applicant/ica/:id/aa',createApplicantApplication)
    function createApplicantApplication(req, res) {
        var aa= req.body;
        var icaId = req.params['id'];
        var user=req.session['currentUser'];
        if(user && user.type==="APPLICANT") {
            aa.position = icaId;
            aa.applicant=user._id;
            typeModel.createApplicantApplication(aa)
                .then(aa => res.send(aa))
        } else
            res.sendStatus(401);

    }


    app.get('/api/aa/:id/details',findApplicantApplicationById)
    function findApplicantApplicationById(req, res) {
        var id = req.params['id'];
        typeModel.findApplicantApplicationById(id)
            .then(aa => res.send(aa))
    }

    app.get('/api/position/:posId/aa/:id/updateselected?:status',updateIsSelected)
    function updateIsSelected(req, res) {
        var id = req.params['id'];
        var pos = req.params['posId'];
        var status=req.query.status;
        icaModel.increaseTaHired(pos)
            .then(() => typeModel.updateIsSelected(id,status)
                .then(course => res.send(course)))
    }

    app.put('/api/aa/review',updateAa)
    function updateAa(req, res) {
        var aa= req.body;
        var user = aa.applicant;
        studentModel.updateRatings(user,aa.instructorRating)
            .then(() =>  typeModel.updateAa(aa._id, aa)
                .then(aa => res.send(aa)));

    }

}