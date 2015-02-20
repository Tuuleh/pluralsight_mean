angular.module('app').controller('mvSignupController', function($scope, mvUser, mvNotifier, mvAuth, $location) {
    //we get the user data, pass it to the auth controller, and continue depending
    //on whether or not the signup was successful
    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }
});