// the route params service allows grabbing the course id from the url
angular.module('app').controller('mvCourseDetailController', function($scope, mvCachedCourses, $routeParams) {
    //$scope.course = mvCourse.get({_id : $routeParams.id})  <- this will work, but we want to use cached data
    //instead of requeting the whole thing all over again every time we want details for a single course
    mvCachedCourses.query().$promise.then(function(collection) {
        collection.forEach(function(course) {
            //if the course is the one requested by the individual course page:
            if(course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    })
});