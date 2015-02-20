angular.module('app').controller('mvCourseListController', function($scope, mvCachedCourses) {
    // mvCourse is a resource we can query to get a list of courses - this doesn't cache, tho, so 
    // we instead query mvCachedCourses! For controllers that need updated data, we will use mvCourse.
    $scope.courses = mvCachedCourses.query();
    $scope.sortOptions = [
        {value: "title", text:"Sort by title"}, 
        {value: "published", text: "Sort by publish date"}
    ];
    //sets default sorting by title
    $scope.sortOrder = $scope.sortOptions[0].value;
}); 