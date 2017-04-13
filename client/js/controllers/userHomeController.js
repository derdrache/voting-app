 app.controller('userHomeController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
   
     $scope.userName = $cookies.get("userName");
     var user = {"user": $scope.userName};
     
     
      $http.post("/userHome", user).success(function(res){
       
       $scope.umfrageDaten = res;
      });
     
     
     
 
 }]);