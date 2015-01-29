angular.module('app').factory('mvUser', function($resource) {
    //for when we'll have the capability to manage users in a restful manner
    var UserResource = $resource('/api/users/:id', {_id:"@id"});
    UserResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    }
    return UserResource;
});