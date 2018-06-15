module.exports =(app) => {
    var typeModel = require('../models/applicantApplication/applicantApplication.model.server')


    app.get('/api/aa',findAllApplicantApplications)
    function findAllApplicantApplications(req, res) {
        typeModel.findAllApplicantApplications()
            .then(icas => res.send(icas))
    }

    app.get('/api/ica/:id/aa',findAllApplicantApplicationsForPostion)
    function findAllApplicantApplicationsForPostion(req, res) {
        var id = req.params['id'];
        typeModel.findAllApplicantApplicationsForPostion(id)
            .then(aa => res.send(aa))
    }

    app.get('/api/applicant/aa',findAllAppliedApplicationsForApplicant)
    function findAllAppliedApplicationsForApplicant(req, res) {
        var user=req.session['currentUser'];

        if(user && user.type==="APPLICANT")
        {
            typeModel.findAllAppliedApplicationsForApplicant(user._id)
                .then(aa =>
                {
                    if(aa.length>0)
                        res.send(aa)
                    else
                        res.sendStatus(404)})
        }
        else
            res.sendStatus(401);
    }

    app.post('/api/applicant/ica/:id',createApplicantApplication)
    function createApplicantApplication(req, res) {
        var aa= req.body;
        var icaId = req.params['id'];
        var user=req.session['currentUser'];
        if(user && user.type==="APPLICANT") {
            ica.position = icaId;
            ica.applicant=user._id;
            typeModel.createApplicantApplication(ica)
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

    app.get('/api/aa/:id/updateselected?:status',updateIsSelected)
    function updateIsSelected(req, res) {
        var id = req.params['id'];
        var status=req.query.status;
        typeModel.updateIsSelected(id,status)
            .then(course => res.send(course))
    }

    app.put('/api/ica/:id',updateAa)
    function updateAa(req, res) {
        var id = req.params['id'];
        var aa= req.body;
        typeModel.updateAa(id,aa)
            .then(aa => res.send(aa))
    }

}