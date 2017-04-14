var app = angular.module("VotingApp", ["ngRoute", "ngCookies"]);

 app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: 'views/home.html'
    })

    .when("/signUp", {
        templateUrl: "/views/signUp.html",
        controller: "signUpController"
    })
    .when("/login", {
        templateUrl: "/views/login.html",
        controller: "loginController"
    })
    .when("/userHome",{
        templateUrl: "/views/userHome.html",
        controller: "userHomeController"
    })
    .when("/userUmfrage", {
        templateUrl: "/views/userUmfrage.html",
        controller: "userUmfrageController"
    })
    .when("/settings", {
        templateUrl: "/views/settings.html",
        controller: "settingController"
    })
    .when("/userUmfrageDone", {
        templateUrl: "/views/userUmfrageDone.html",
        controller: "userUmfrageController"
    })
    .when("/:user/:title" ,{
        templateUrl: "/views/umfragen.html",
        controller: "umfragenController"
    })
    
     
});