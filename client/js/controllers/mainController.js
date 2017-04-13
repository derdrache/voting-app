app.controller('MainController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
   
  
    $scope.go = function(path){
        $location.path(path);
        $scope.userName = $cookies.get("userName");
    };
    
    $scope.logout = function(){
        $location.path('/');
        $cookies.remove("userName");
    }
    

    
    
    
    
    
    


}]);