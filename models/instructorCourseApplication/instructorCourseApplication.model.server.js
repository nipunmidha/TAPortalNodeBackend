var mongoose = require('mongoose');
var instructorCourse = require('./InstructorCourseApplication.schema.server');
var instructorCourseModel = mongoose.model('InstructorCourseModel', instructorCourse);

function createIca(ica) {
    return instructorCourseModel.create(ica);
}

function findAllIca() {
    return instructorCourseModel.find()
        .populate('instructor')
        .populate('course')
        .exec();
}

function findAllIcaForCourse(courseId) {
    return instructorCourseModel.find({course:courseId})
        .populate('instructor')
        .exec();
}

function findAllIcaForInstructor(instructorId) {
    return instructorCourseModel.find({instructor:instructorId})
        .populate('course')
        .exec();
}


function findIcaById(id) {
    return instructorCourseModel.findById(id)
        .populate('instructor')
        .populate('course')
        .exec();
}

function updatePostionFilled(id,status) {
    return instructorCourseModel.findOneAndUpdate({_id:id},{$set:{postionsFilled:status}})
}

function updateCourseCompleted(id,status) {
    return instructorCourseModel.findOneAndUpdate({_id:id},{$set:{courseCompleted:status}})
}

updateIca=(id,ica)=>(
    instructorCourseModel.findById(id)
        .then((oldIca)=>
        {
            if(ica.classStrength)
                oldIca.classStrength=ica.classStrength
            if(ica.noOfTa)
                oldIca.noOfTa=ica.noOfTa
            if(ica.syllabus)
                oldIca.syllabus=ica.syllabus
            if(ica.skillsMustNeeded)
                oldIca.skillsMustNeeded=ica.skillsMustNeeded
            if(ica.year)
                oldIca.year=ica.semestyearer
            if(ica.sectionName)
                oldIca.sectionName=ica.sectionName
            instructorCourseModel.updateOne({_id:id},oldIca);
            return oldIca;
        })
)

var api={
    createIca:createIca,
    findAllIca:findAllIca,
    findIcaById:findIcaById,
    updateIca:updateIca,
    findAllIcaForCourse:findAllIcaForCourse,
    findAllIcaForInstructor:findAllIcaForInstructor,
    updatePostionFilled:updatePostionFilled,
    updateCourseCompleted:updateCourseCompleted
}

module.exports = api;