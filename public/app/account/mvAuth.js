angular.module('app').factory('mvAuth', function($http, $q, mvIdentity, mvUser) {
    return {
        authenticateUser: function(username, password) {
            //deferred and promises
            var dfd = $q.defer();
            //http post to the login route - after that finishes, we get a response back
            $http.post('/login', {username:username, password:password}).then(function(response) {
                //if the success property of the response is true:
                if(response.data.success) {
                    //we take data out of the response and create a user resource class out of it
                    var user = new mvUser();
                    //extends the user object from the data from the http response
                    angular.extend(user, response.data.user);
                    //toastr message:
                    mvIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        updateCurrentUser: function(newUserData) {
            var dfd = $q.defer();
            //we can get all the user information from mvIdentity.currentUser,
            //but we don't want to modify it until we can be sure that the update
            //will be successful, so instead, we make a copy of it:
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            //save posts the data to the server -> angular's $save calls post, not put,
            //so we have to do something if we want to just update an existing user. We 
            //created this new method in the user resource under mvUser.
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $q.defer();
            // the object containing the logout parameter is sent with the post request simply
            // because angular turns it into a get if the request goes without a body
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            }
            else {
                //the route changer will reject the request for the page because the user
                //was logged in, but was not an admin
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function(role) {
            if(mvIdentity.isAuthenticated()) {
                return true;
            }
            else {
                //user was not logged in
                return $q.reject('not logged in');
            }
        },
        createUser: function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            //newUser is a resource object -> we can call save on it 
            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            })

            return dfd.promise;
        }
    }
});