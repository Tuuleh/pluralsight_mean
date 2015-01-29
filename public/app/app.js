angular.module('app', ['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    var routeRoleChecks = {
        admin: {auth: function(mvAuth) {
                    return auth.authorizeCurrentUserForRoute('admin');
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl:'/partials/main/main', 
            controller: 'mvMainController'
        })
        .when('/admin/user', {
            templateUrl:'/partials/admin/user-list', 
            controller: 'mvUserListController',
        //route resolve: we get an empty page when the user list page is requested by someone
        //who doesn't have admin rights. We're going to redirect them back to the default page,
        //instead of the empty list page, using a route resolver
            resolve: routeRoleChecks.admin;
        })
});

//when you call run, the code you pass to it will be executed after the module has been
//completely configured -> after the code that's defined above
angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        //if the rejection string matches the one specified in the authorization, 
        //redirect to front page
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});

