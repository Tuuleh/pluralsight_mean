angular.module('app').factory('mvUser', function($resource) {
    //for when we'll have the capability to manage users in a restful manner
    var UserResource = $resource('/api/users/:id', {id:"@id"}, {
        //creating a method for put -> updating user data
        update: {method: 'PUT', isArray: false}
    });

    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    }
    return UserResource;
});