app.controller('loginController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
    
         /* User Anmeldung*/
    $scope.loginSubmit = function(loginData, key){
        if (key == null || key.keyCode === 13 ){
            $http.post ("/login", loginData).success(function(res){
                if (res == true){
                    $location.path("/userHome");
                    $cookies.put("userName", loginData.name.toLowerCase())
                }
                else {$scope.loginError = "Name oder Passwort falsch"}
            });
        }
    };
    
    
}]);