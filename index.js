var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";
const url = "https://derdrache-voting-app.herokuapp.com/#/";


app.use(express.static(__dirname+"/client"));
app.use(bodyParser.json());



/* Login vorgang*/
app.post("/login", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if(err) throw err;
        db.collection("userdata").find({}).toArray(function(err,result){
            if (err) throw err;
            var login = "false";
            
            for(var i= 0; i<result.length; i++){
                if (result[i].user == req.body.name.toLowerCase()){
                    if (result[i].password == req.body.password){
                        login= true;
                    }else{
                        login = false;
                    }
                }
            }
            res.send(login);
        });
        db.close();
    });
});

/* User Anlegen*/
app.post("/signUp", function(req,res){
    mongoClient.connect(dburl,function(err,db){
        if (err) throw err;
        
        /* prüfen ob Name und Email schon vergeben sind */
        db.collection("userdata").find({}).toArray(function(err,result){
            if (err) throw err;
            var check = false;
    
               for (var i= 0; i< result.length; i++){
                  if (req.body.name.toLowerCase() == result[i].user){
                      check = "Name ist bereits vergeben";
                      break;
                  }
                  if (req.body.email.toLowerCase() == result[i].email){
                      check = "Email ist bereits vergeben";
                      break;
                  }
               }
               
               /* Name oder Email schon in Benutzung */
               if (check !== false){
                   res.send(check);
                   db.close();
               }
               else {
                    db.collection("userdata").insert({
                        "user": req.body.name.toLowerCase(),
                        "email": req.body.email.toLowerCase(),
                        "password": req.body.password
                    });
                check = true;    
                res.send(check);    
                db.close();
               }
         });
    });
});

/* Passwort Änderung*/
app.post("/settings", function(req,res){
    mongoClient.connect(dburl, function(err, db){
        if (err) throw err;
        
        /* altes Passwort richtig?*/ 
        db.collection("userdata").find({"user": req.body.userName}).toArray(function(err, result){
            if (err) throw err;
         
            if (result[0].password !== req.body.old){
                res.send("Passwort ist falsch");
            } else{
                /* Wenn richtig, neues Passwort in die db*/
                db.collection("userdata").update({"user": req.body.userName.toLowerCase()},
                {$set:
                {"password" : req.body.new1}
                });
                res.send("Passwort erfolgreich geändert");
            }
             db.close();
        });
            
    });
});

/* Achtung der User erstellt eine Umfrage!*/
app.post("/userUmfrage", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        /* prüfen ob parameter schon vergeben sind */
        db.collection("umfragen").find({"user": req.body.user, "title": req.body.title}).toArray(function(err,result){
        if (err) throw err;
        if (result === []){console.log(result); res.send("Umfragenname bereits in Verwendung")}
        else{
            
            /* Daten in die db*/
            var titleChange = req.body.title.split(" ").join("-");
            if (titleChange.indexOf("?") > 0){
             titleChange = titleChange.slice(0,titleChange.indexOf("?"));   
            }
            
            var newUrl = url+req.body.user+"/"+titleChange;
            
            
                db.collection("umfragen").insert({
                    "user": req.body.user,
                    "umfragenUrl": newUrl,
                    "title": req.body.title,
                    "optionen": req.body.optionen,
                    "stimmen": req.body.stimmen
                }); 
                res.send(newUrl);   
            }
        db.close();   
        });
    });
});

/* User Umfragenliste abfragen */

app.post("/userHome", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        db.collection("umfragen").find({"user": req.body.user}).toArray(function(err, result){
            if (err) throw err;

          var userUmfragen = [];
          for (var i=result.length; i>0; i--){
              userUmfragen.push(result[i-1]);
          }
          
        res.send(userUmfragen);    
        db.close();
        });
    });
});


/* Spezifische UserUmfrage anzeigen*/

app.post("/umfragen", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        /* Umfrage abfragen */
        if (!req.body.stimmen){
            db.collection("umfragen").find({"user": req.body.user, "umfragenUrl": url+req.body.user+"/"+req.body.title }).toArray(function(err,result){
                if (err) throw err;
               
            res.send(result[0]);
            db.close();    
            });
        }
        else{
            db.collection("umfragen").update({"umfragenUrl": req.body.umfragenUrl},
                {$set:
                {"stimmen": req.body.stimmen}
                });
            res.send({"ausgabe": "Deine Abstimmung war erfolgreich", "id": req.body._id})    
            db.close();    
        }
    });
});







app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})

