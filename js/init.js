$(document).ready(function(){
	cargar_datos();

	$(".titulo").click(function(){
		var contenedor = $(this).parent().attr("id");
		var visible = $("#" + contenedor + " .cont-datos").css("display");
		if(visible == "block"){
			$("#" + contenedor + " .titulo .flecha").removeClass("fdesc");
			$("#" + contenedor + " .titulo .flecha").addClass("fasc");
		}
		else if(visible == "none"){
			$("#" + contenedor + " .titulo .flecha").addClass("fdesc");
			$("#" + contenedor + " .titulo .flecha").removeClass("fasc");
		}
		$("#" + contenedor + " .cont-datos").toggle(200);
	});
});

function cargar_datos(){
	var poblacion, carrusel, referencia, titulo;
	var tabla = $(".datos");
	var imagenes = $(".carrusel ul");
	$.ajax({	    	    
	    url: "http://aspirantes.hablacreativo.com/api/v1/admission_test"
	})
    .done(function(data) {
    	console.log("GWC: Consumo exitoso");
    	console.log(data);
    	$.each(data.data, function( key, value ) {
    		if(key == "table-data")
    			poblacion = value;
    		else if(key == "carousel")
    			carrusel = value;
		});

		titulo = poblacion.about;
		referencia = poblacion.source;
    	poblacion = poblacion.values;
    	$.each(poblacion, function(key, value) {
		  	tabla.append(
		  		"<tr>" +
			  		"<td class='title'>" + value.zone + "</td>" +
			  		"<td>" + value.y1993 + "</td>" +
			  		"<td>" + value.y2005 + "</td>" +
			  		"<td>" + value.y2010 + "</td>" +
			  		"<td>" + value.y2015 + "</td>" +
			  	"</tr>");
		});

		$("#poblacion .titulo span").html(titulo);
		$("#poblacion .referencia").html(referencia);

		tabla.tablesorter({
			sortList: [[0,0]]
		});

		carrusel = carrusel.images;
		$.each(carrusel, function(key, value) {
			imagenes.append("<li><img src='" + value + "'/></li>");
		});

		$('.flexslider').flexslider({
			animation: "slide",
			start: function(slider){
			  $('body').removeClass('loading');
			}
		});

		$(".loading").hide();
		$(".error").hide();
		$(".content").show();
    })
    .fail(function(error){
    	console.log("GWC-Error: " + error.statusText);
    	$(".loading").hide();
    	$(".error").show();
    	$(".content").hide();	
    })
}