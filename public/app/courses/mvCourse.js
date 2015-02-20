angular.module('app').factory('mvCourse', function($resource) {
    //:_id is a placeholder for id, and the object with the id param sets its value
    var CourseResource = $resource('/api/courses/:_id', {id: "@id"}, {
        update: {method: 'PUT', isArray: false}
    });
    return CourseResource;
});