var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection) {
        res.send(collection);
    })
}

exports.getCoursesById = function(req, res) {
    Course.findOne({_id:req.params.id}).exec(function(err, course) {
        if(err) {
            console.log(err);
        }
        else{
            console.log('no err, course: ' + course)
        }
        res.send(course);
    })
}