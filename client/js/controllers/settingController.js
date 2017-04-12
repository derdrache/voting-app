app.controller('settingController', ['$scope', "$location", "$http","$cookies", function($scope,$location, $http,$cookies) {
   
    $scope.passwordChange = function(data){
        data.userName = $cookies.get("userName");
        
            if (!data.old || !data.new1||!data.new2){ $scope.passwordChangeError= "Alle Felder müssen ausgefüllt sein";}
            else{
                if (data.new1 === data.new2){
                    $http.post("/settings", data).success(function(res){
                     console.log(res);
                    $scope.passwordChangeError = res;
                    });
                }
                else{
                   $scope.passwordChangeError ="Die neuen Passworter stimmen nicht überein";
                }
            }    
    };
    
}]);