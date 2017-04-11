var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";


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
                if (result[i].user == req.body.name){
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
            var check = true;
    
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
               if (check !== "true"){
                   res.send(check);
                   db.close();
               }
                /* User Daten in die Db schreiben */
               else{
                    db.collection("userdata").insert({
                        "user": req.body.name,
                        "email": req.body.email,
                        "password": req.body.password
                    });
                    
                res.send(check);    
                db.close();
               }
         });
    });
});

/* Hier könnte es weiter gehen*/





app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})