angular.module('app').controller('mvProfileController', function($scope, mvAuth, mvIdentity, mvNotifier) {
    $scope.email = mvIdentity.currentUser.email;
    $scope.fname = mvIdentity.currentUser.firstName;
    $scope.lname = mvIdentity.currentUser.lastName;

    $scope.update = function() {
        var newUserData = {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        }
        //we'll only update the password if the user has set it,
        //so we need to check if the password has been set:
        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(newUserData).then(function() {
            mvNotifier.notify('Your user account has been updated.');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }
});