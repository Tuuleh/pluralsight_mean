angular.module('app').controller('mvUserListController', function($scope, mvUser) {
    //mvUser is a service (or a factory), so you can just query it 
    $scope.users = mvUser.query();
});