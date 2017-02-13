$(document).ready(function(){
	cargar_datos();
});

function cargar_datos(){
	var poblacion, carrusel;
	var tabla = $(".datos");
	var imagenes = $(".carrusel ul");
	$.ajax({	    	    
	    url: "http://aspirantes.hablacreativo.com/api/v1/admission_test"
	})
    .done(function(data) {
    	console.log("GWC: Consumo exitoso");
    	$.each(data.data, function( key, value ) {
    		if(key == "table-data")
    			poblacion = value;
    		else if(key == "carousel")
    			carrusel = value;
		});
		
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
		$(".content").show();
    })
    .fail(function(error){
    	console.log("GWC-Error: " + error.statusText);
    })
}