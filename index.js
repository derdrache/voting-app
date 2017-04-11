var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps"


app.use(express.static(__dirname+"/client"))
app.use(bodyParser.json());

/* Login vorgang*/
app.post("/login", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        db.collection("userdata").find({}).toArray(function(err,result){
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







app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})