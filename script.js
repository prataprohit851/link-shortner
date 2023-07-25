const request = require('request');
const express = require('express');
const bodyParser = require("body-parser");
let ejs = require('ejs');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

let shortenURL = "";

app.post("/request", function(req, res){
    const options = {
        method: 'POST',
        url: 'https://url-shortener-service.p.rapidapi.com/shorten',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '5878c6f844mshea9f3015c9955f8p14d5ecjsnc83d46c624de',
          'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        form: {
          url: req.body.URL
        }
    };
      
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(JSON.parse(response.body).result_url);
        shortenURL = JSON.parse(response.body).result_url;
        res.redirect("/");
    });

});

app.get("/", function(req, res){
    if(shortenURL == ""){
        res.render(__dirname + "/index.ejs", {shortenLink: ""});
    }
    else{
        res.render(__dirname + "/index.ejs", {shortenLink: "Shorten URL: " + shortenURL});
        shortenURL = "";
    }
});

app.listen(3000), function(){
    console.log("Server is running");
};