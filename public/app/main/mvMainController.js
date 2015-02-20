angular.module('app').controller('mvMainController', function($scope, mvCachedCourses) {
    //we query the cached courses factory for the course list
    $scope.courses = mvCachedCourses.query();
});