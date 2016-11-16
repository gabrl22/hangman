var express = require("express");
var bodyParser = require("body-parser");
var temas = require('./mock/datos.json');

var app = express();
var port = 8080;
var tema;
var palabra;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hola", function(req, res){
    res.send("hola");
});

app.get("/tema/:nombre", function(req, res){
    res.json(temas);
});

app.listen(port);

console.log("Server running at port..." + port);