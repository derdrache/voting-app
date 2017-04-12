app.controller('MainController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
   
    
    
    
    $scope.go = function(path){
        $location.path(path);
    };
    
    $scope.logout = function(){
        $location.path('/');
        $cookies.remove("userName");
        $scope.userName = $cookies.get("userName");
    }
    
    $scope.newSubmit = function (newUserData){
       if (!newUserData.name || !newUserData.email || !newUserData.password)
       {$scope.regError= "Anmeldedaten sind Fehlerhaft"}
       else{
            $http.post("/signUp", newUserData).success(function(res){
                if (res == true){$location.path("/userHome")}
                else{$scope.regError = res}
                $cookies.put("userName", newUserData.name) 
                $scope.userName = $cookies.get("userName");
                
            });
       }
    };
    
    $scope.loginSubmit = function(loginData, key){
        if (key == null || key.keyCode === 13 ){
            $http.post ("/login", loginData).success(function(res){
                if (res == true){
                    $location.path("/userHome");
                    $cookies.put("userName", loginData.name)
                    $scope.userName = $cookies.get("userName");
                }
                else {$scope.loginError = "Name oder Passwort falsch"}
            });
        }
    };
    
    
    
    


}]);