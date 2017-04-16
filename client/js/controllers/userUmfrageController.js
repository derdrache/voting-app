 app.controller('userUmfrageController', ['$scope', "$location", "$http", "$cookies", function($scope,$location, $http, $cookies) {
   
     $scope.inputs = [{},{}];
     $scope.userName = $cookies.get("userName");
     $scope.umfrageErstellen = true;
     $scope.showLink = false;
     
    $scope.addField = function(){
      $scope.inputs.push({})
      
     }
     
     $scope.getData = function(data){
       var umfrage = {
        "title" : data.title,
        "optionen": [],
        "stimmen": [],
        "stimmenGes": 0,
        "user": $cookies.get("userName")
       }; 
       
       for (var i= 0; i<$scope.inputs.length; i++){
        if ($scope.inputs[i].value)
        umfrage.optionen.push($scope.inputs[i].value)
        umfrage.stimmen.push(0);
       }
       
       $http.post("/userUmfrage", umfrage).success(function(res){
        $scope.umfrageLink = res;
        $scope.umfrageErstellen = false;
        $scope.showLink = true

       })
     }
 }]);