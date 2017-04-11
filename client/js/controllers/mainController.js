app.controller('MainController', ['$scope', "$location", "$http", function($scope,$location, $http) {
   
    $scope.go = function(path){
        $location.path(path);
    };
    
    
    $scope.newSubmit = function (newUserData){
       if (!newUserData.name || !newUserData.email || !newUserData.password)
       {$scope.regError= "Anmeldedaten sind Fehlerhaft"}
       else{
            $http.post("/signUp", newUserData).success(function(res){
                if (res == true){$location.path("/userHome")}
                else{$scope.regError = res}
                $scope.loginName = newUserData.name;
            });
       }
    };
    
    $scope.loginSubmit = function(loginData, key){
        if (key == null || key.keyCode === 13 ){
            $http.post ("/login", loginData).success(function(res){
                if (res == true){
                    $location.path("/userHome");
                    localStorage.setItem("name", loginData.name)
                    $scope.loginName = localStorage.getItem("name");
                    
                }
                else {$scope.loginError = "Name oder Passwort falsch"}
            });
        }
    };

}]);