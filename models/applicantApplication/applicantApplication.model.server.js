var mongoose = require('mongoose');
var applicantApplication = require('./InstructorCourseApplication.schema.server');
var applicantApplicationModel = mongoose.model('ApplicantApplicationModel', applicantApplication);

function createApplicantApplication(ica) {
    return applicantApplicationModel.create(ica);
}

function findAllApplicantApplications() {
    return applicantApplicationModel.find()
        .populate('applicant')
        .populate('position')
        .exec();
}

function findAllAppliedApplicationsForApplicant(id) {
    return applicantApplicationModel.find({applicant:id})
        .populate('position')
        .exec();
}

function findAllApplicantApplicationsForPostion(id) {
    return applicantApplicationModel.find({position:id})
        .populate('applicant')
        .exec();
}


function findApplicantApplicationById(id) {
    return applicantApplicationModel.findById(id)
        .populate('position')
        .populate('applicant')
        .exec();
}

function updateIsSelected(id,status) {
    return applicantApplicationModel.findOneAndUpdate({_id:id},{$set:{isSelected:status}})
}



updateAa=(id,application)=>(
    applicantApplicationModel.findById(id)
        .then((oldApplication)=>
        {
            if(application.classStrength)
                oldApplication.instructorRemarks=application.instructorRemarks
            if(application.noOfTa)
                oldApplication.instructorRating=application.instructorRating
            applicantApplicationModel.updateOne({_id:id},oldApplication);
            return oldApplication;
        })
)

var api={
    createApplicantApplication:createApplicantApplication,
    findAllApplicantApplications:findAllApplicantApplications,
    findAllAppliedApplicationsForApplicant:findAllAppliedApplicationsForApplicant,
    findAllApplicantApplicationsForPostion:findAllApplicantApplicationsForPostion,
    findApplicantApplicationById:findApplicantApplicationById,
    updateIsSelected:updateIsSelected,
    updateAa:updateAa
}

module.exports = api;