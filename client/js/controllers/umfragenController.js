app.controller('umfragenController', ['$scope', "$location", "$http", "$cookies","$routeParams", function($scope,$location, $http, $cookies,$routeParams) {


    //cookie für schon gewählt fehlt noch

    var umfrage = $routeParams;
    var daten= {};
    $scope.abstimmenShow = true;
    $scope.abstimmungsErgebnis = false;
    
    if ($cookies.get("userName")){$scope.userName = $cookies.get("userName")}
    else{$scope.userName = "Gast"}
    
    $http.post("/umfragen", umfrage).success(function(res){
        $scope.umfrageDaten = res;
        $scope.optionen = res.optionen;
        daten= res;
    });

    $scope.auswahl = function(auswahl){
        var index= -1;

        for (var i = 0; i<daten.optionen.length; i++){
            if (auswahl == daten.optionen[i]){
                index= i;
                break;
            }
        }
        daten.stimmen[index] ++;
        $scope.abstimmenShow = false;
       
        
        $http.post("/umfragen", daten).success(function(res){
            $scope.abgestimmt = res;
            $scope.abstimmungsErgebnis = true;
        });
    }    



    
}])