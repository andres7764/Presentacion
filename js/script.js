window.onload = function()
{
	var crearPlaneta = function(data)
	{
		
		var ancho = window.innerWidth;
		var alto = window.innerHeight;
		var lienzo = new THREE.WebGLRenderer({alpha: true});
		lienzo.setSize(ancho, alto);
		document.body.appendChild(lienzo.domElement);
	/*Pintar sol*/
//		var tamanoSol = Math.floor((data[0].tamano / 32984) * 100);
		var geometria = new THREE.SphereGeometry(400,400,400);
		var textura = THREE.ImageUtils.loadTexture("img/sol.jpg");
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		var sol = new THREE.Mesh(geometria, material);
	/* Pintar planeta*/
		var tamano = Math.floor((data[0].tamano / 32984) * 100);
		var geometria = new THREE.SphereGeometry(tamano,tamano,tamano);
		var textura = THREE.ImageUtils.loadTexture(data[0].imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		var object = new THREE.Mesh(geometria, material);
		
		//return new THREE.Mesh(geometria, material);
	var escena 		  = new THREE.Scene,
	tamanoJupiter = 300;
	escena.add(object);
	escena.add(sol);

	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	sol.position.x = -1000;
	object.position.x = 900;
	camara.lookAt(object.position);
	var cons = 0;
	escena.add(camara);
	
	function renderizar()
	{
		object.rotation.y += 0.001;
		sol.rotation.y += 0.001;
		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
	};
//cargar
	$('#planeta').change(function(){
		if($('#planeta').val() === "seleccione"){
			$("#texto").html("");
			
				responsiveVoice.speak("Por favor seleccione uno de los planetas de la lista", "Spanish Latin American Female");
		} else { 
		responsiveVoice.cancel();
		$.ajax({
			datatype: JSON,
			data: {planeta: $('#planeta').val()},
			method: 'POST', 
			url: 'http://104.154.58.249:8080/obtenerPlanetas'
		}).done(function(results){
			var planeta = crearPlaneta(results);
			$("#head").remove();
			$("#texto").html(results[0].descripcion);
			$("#texto").addClass("texto");
			swal({   
				title: "información",   
				text: "¿Desea escuchar la información?",
				imageUrl: "img/sonido.jpg",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Escuchar",   
				closeOnConfirm: true
			}, function(){
				responsiveVoice.speak(results[0].descripcion, "Spanish Latin American Female");
			});

			})
		}
	});

	$('#info').click(function(){
		responsiveVoice.speak("Información tomada de wikipedia", "Spanish Latin American Female");
	})
	$('#sol').click(function(){
		swal("El sol!", "El Sol es también nuestra principal fuente de energía, que se manifesta, sobre todo, en forma de luz y calor. Esta a 150 millones de kilómetros de la Tierra. su diametro es de 695.000 km. Su rotación sobre su mismo eje es de 25 a 36 días. <br>su temperatura superficial es de 6000 º C")
	})
};
