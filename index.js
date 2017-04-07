var express = require("express");
var app = express();
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://shortener:shortener@ds145220.mlab.com:45220/shortener"

app.use(express.static(__dirname+"/client"))



app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})