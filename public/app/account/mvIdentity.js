angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser;
    //if window contains the bootstrapped user object
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.indexOf(role) > -1;
        }
    }
});