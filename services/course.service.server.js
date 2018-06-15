module.exports =(app) => {
    var typeModel = require('../models/course/course.model.server')


    app.get('/api/course',findAllCourses)
    function findAllCourses(req, res) {
        typeModel.findAllCourses()
            .then(courses => res.send(courses))
    }

    app.get('/api/school/:id/course',findAllCoursesForSchool)
    function findAllCoursesForSchool(req, res) {
        var id = req.params['id'];
        typeModel.findAllCoursesForSchool(id)
            .then(course => res.send(course))
    }

    app.post('/api/school/:id/course',createCourse)
    function createCourse(req, res) {
        var course= req.body;
        var id = req.params['id'];
        course.school=id;
        typeModel.createCourse(course)
            .then(course => res.send(course))
    }


    app.get('/api/course/:id/profile',findCourseById)
    function findCourseById(req, res) {
        var id = req.params['id'];
        typeModel.findCourseById(id)
            .then(course => res.send(course))
    }


    // app.put('/api/course/:id',updateCourseById)
    // function updateCourseById(req, res) {
    //     var id = req.params['id'];
    //     var user= req.body;
    //     typeModel.(id,user)
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