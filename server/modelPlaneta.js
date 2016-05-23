var mongoose = require('mongoose');

// crear colección
 infoPlanetas = new mongoose.Schema({
	nombrePlaneta: { type: String },
	descripcion:   { type: String },
	imagen:  	   { type: String },
	tamano: 	   { type: String }
})

module.exports = mongoose.model('planetas', infoPlanetas);
