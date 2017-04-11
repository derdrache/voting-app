var app = angular.module("VotingApp", ["ngRoute"]);

 app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '/views/home.html'
        
    })
    .when("/signUp", {
        templateUrl: "/views/signUp.html"
    })
    .when("/login", {
        templateUrl: "/views/login.html",
    })
    .when("/userHome",{
        templateUrl: "/views/userHome.html",
    })
    .when("/userUmfrage", {
        templateUrl: "/views/userUmfrage.html"
    })
    .when("/settings", {
        templateUrl: "/views/settings.html"
    })    

});