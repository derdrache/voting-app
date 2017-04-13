app.controller('signUpController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
    
        /* Neuen User anlegen*/
    $scope.newSubmit = function (newUserData){
       if (!newUserData.name || !newUserData.email || !newUserData.password)
       {$scope.regError= "Anmeldedaten sind Fehlerhaft"}
       else{
            $http.post("/signUp", newUserData).success(function(res){
                if (res == true){$location.path("/userHome")}
                else{$scope.regError = res}
                $cookies.put("userName", newUserData.name) 
            });
       }
    };
    
}]);