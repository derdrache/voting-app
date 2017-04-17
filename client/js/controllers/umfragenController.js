app.controller('umfragenController', ['$scope', "$location", "$http", "$cookies","$routeParams","$route", function($scope,$location, $http, $cookies,$routeParams,$route) {

    //cookie für schon gewählt fehlt noch
    
    var umfrage = $routeParams;
    var daten= {};
    $scope.user = false;
    $scope.gast = true;
    $scope.abstimmenShow = true;
    $scope.abstimmungsErgebnis = false;
    
    /* EIn User oder Gast*/
    if ($cookies.get("userName")){
        $scope.userName = $cookies.get("userName");
        $scope.gast= false;
        $scope.user = true;
        
    }
    else{$scope.userName = "Gast"}
    
    
    /* Daten abfragen */
    $http.post("/umfragen", umfrage).success(function(res){
        $scope.umfrageDaten = res;
        $scope.optionen = res.optionen;
        daten= res;
    
        /* Wenn schon abgestimmt*/
        
        if ($cookies.get(res._id)){
            Zeichnung();
            $scope.abstimmenShow = false;
            $scope.abstimmungsErgebnis = true;
        }
        
        
    });
    
  
    

    
    /* Abstimmen */
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
            $cookies.put(res.id.toString(), true)
            //$scope.abgestimmt = res;
            $scope.abstimmungsErgebnis = true;
            alert(res.ausgabe);
            
        });
      
        
        Zeichnung();

    };  
    
    
    
    function Zeichnung (){
                
            var abstimmungsData= [];
            var stimmenGes = 0;
        for (var i= 0; i<daten.stimmen.length; i++){
            abstimmungsData.push({"optionen": daten.optionen[i], "stimmen" : daten.stimmen[i]})
            stimmenGes = stimmenGes + daten.stimmen[i];
            }

        var margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 40
        }  
          
        var w = 960-margin.left-margin.right;
        var h = 550-margin.top-margin.bottom; 
        var barPadding = 1;  
          
          
        var svg = d3.select("svg")
                    .attr("width", 960)
                    .attr("height", 550); 
                    
                    
        var x = d3.scaleBand().rangeRound([0, w]).padding(0.1)
        x.domain(abstimmungsData.map(function(d) { return d.optionen; }));
        
        svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + h + ")")
          
          .call(d3.axisBottom(x));
          
      
        svg.selectAll("rect")
            .data(abstimmungsData)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return i*(w/abstimmungsData.length);
            })
            .attr("y", function(d){
                //return h-(d.stimmen*10);
                return h-(h/stimmenGes*d.stimmen*0.95)
            })
            .attr("width", w/abstimmungsData.length - barPadding)
            .attr("height", function(d){
                //return (d.stimmen*10);
                return h/stimmenGes*d.stimmen*0.95;
            })
            .attr("fill", "#04B404")


            svg.selectAll("yAxis")
                .data(abstimmungsData)
                .enter()
                .append("text")
                .text(function(d){
                    return d.stimmen;
                })
                .attr("x", function(d,i){
                    return i*((w/abstimmungsData.length))+((w/2)/abstimmungsData.length);
                })
                .attr("y", function(d){
                    return (h - (h/stimmenGes*d.stimmen*0.95)-10);
                })
    }
    
}]);