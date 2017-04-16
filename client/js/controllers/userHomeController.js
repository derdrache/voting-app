 app.controller('userHomeController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
   
     $scope.userName = $cookies.get("userName");
     var user = {"user": $scope.userName};
     
      $http.post("/userHome", user).success(function(res){
       for (var i = 0; i < res.length; i++){
        var index = 0;
        for (var j = 0; j < res[i].stimmen.length; j++){
         index = index +res[i].stimmen[j];
        }
        res[i].stimmenGes = index;
       }
       $scope.umfrageDaten = res;
       
      });

 }]);