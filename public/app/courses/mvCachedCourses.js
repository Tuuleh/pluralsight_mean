angular.module('app').factory('mvCachedCourses', function(mvCourse) {
    var courseList;

    return {
        query: function() {
            //querying mvCachedCourses returns a course list, which is populated by 
            //querying the mvCourse resource, unless it already existed.
            if(!courseList) {
                courseList = mvCourse.query();
            }

            return courseList; 
        }
    }
});