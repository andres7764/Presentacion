var express = require('express');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var planetas = require('./modelPlaneta');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
//app.use(express.static("/"));
mongoose.connect('mongodb://localhost/planetas');

app.use(express.static('public'));
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/photos" }));
app.use(express.static('/'));									// log every request to the console
app.use(bodyParser.urlencoded({ extended : true})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json());									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.get("/", function(req,res){
	res.send("Hola");
});

app.post('/guardarPlaneta', function(req,res){
	var nuevoPlaneta = new planetas({
	nombrePlaneta: req.body.nombre,
	descripcion: req.body.descripcion,
	imagen: req.body.imagen,
	tamano: req.body.tamano
	})
	nuevoPlaneta.save(function(err, bien){
		console.log(bien);
	})
})

app.post("/obtenerPlanetas", function(req,res){
	var query = planetas.find({'nombrePlaneta': req.body.planeta}).exec(function(err, result){
		if(err){ return res.send(err.messaje); }
		return res.send(result);
	})
})

http.listen(3000);
console.log("todo está bien");