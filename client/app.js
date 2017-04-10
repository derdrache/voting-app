var app = angular.module("VotingApp", ["ngRoute"]);

 app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '/views/home.html'
    })
    .when("/test", {
        templateUrl: "/views/test.html"
    })

});