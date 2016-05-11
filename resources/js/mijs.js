$(document).ready(function() {
	    setTimeout(function() {
	        $(".bienvenido").fadeOut(1500);
	    },2000);
	});
	$(document).ready(function() {
	    setTimeout(function() {
	        $(".top").fadeIn(100);
	    },3500);
	});
	function openlogin(){
		document.getElementById('buttons').style.display = 'none';
		document.getElementById('loggin').style.display = 'block';
	}
	function openregister(){
		document.getElementById('buttons').style.display = 'none';
		document.getElementById('register').style.display = 'block';
	} 
	function abrir_user() { 
		document.getElementById('User').style.display = 'block';

		var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function() {
	    	if (xhttp.readyState == 4 && xhttp.status == 200) {
	     		document.getElementById("Userexp").innerHTML = xhttp.responseText;
	     		var Exp = xhttp.responseText;
	     		var Porcentaje = (Exp*100)/1000;
	     		document.getElementById("barraExp").style.width = Porcentaje+'%';
	     		document.getElementById("barraExptext").innerHTML = Porcentaje+'%';
	    		}
	  		};
	  xhttp.open("GET", "DB_Functions.php", true);
	  xhttp.send();
	
		}

	function cerrar_user(){
		document.getElementById('User').style.display = 'none';	
	}	
	