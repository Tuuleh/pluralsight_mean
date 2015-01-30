//this is a fake app.js file we'll add to our karma configuration for testing

//for unit tests, we won't test routing, and so we don't put angular route as a dependency
angular.module('app', ['ngResource']);
//blank fake toastr global object:
var toastr = {};
