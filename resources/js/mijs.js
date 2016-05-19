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
	function closelogin(){
		document.getElementById('buttons').style.display = 'block';
		document.getElementById('loggin').style.display = 'none';
	}
	function closeregister(){
		document.getElementById('buttons').style.display = 'block';
		document.getElementById('register').style.display = 'none';
	}
	function abrir_user() { 
		document.getElementById('User').style.display = 'block';

		var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function() {
	    	if (xhttp.readyState == 4 && xhttp.status == 200) {
	     		document.getElementById("Userexp").innerHTML = xhttp.responseText;
	     		var Exp = xhttp.responseText;
	     		document.getElementById('barraExp').style.width = Exp;
	     		}
	  		};
	  xhttp.open("GET", "DB_Functions.php", true);
	  xhttp.send();

	  	var xhttp2 = new XMLHttpRequest();
	  	xhttp2.onreadystatechange = function() {
	    	if (xhttp2.readyState == 4 && xhttp2.status == 200) {
	     		var Exp_total = xhttp2.responseText;
	     		document.getElementById("Userexptotal").innerHTML = Exp_total;
	     		var Exp = xhttp.responseText;
	     		var Porcentaje = (Exp*100) / Exp_total;
	     		document.getElementById('barraExp').style.width = Math.floor(Porcentaje)+'%';
	     		document.getElementById('barraExptext').innerHTML = Math.floor(Porcentaje)+'%';
	     		}
	  		};
	  xhttp2.open("GET", "DB_Functions2.php", true);
	  xhttp2.send();

	
		}

	function cerrar_user(){
		document.getElementById('User').style.display = 'none';	
	}
	function okregister(){
		document.getElementById('okRegister').style.display = 'block';
	}
	function cerrar_okregister(){
		document.getElementById('okRegister').style.display = 'none';	
	}	
	function abrirnivel1(){
		if(document.getElementById('nivelmapa1').style.display == '' || document.getElementById('nivelmapa1').style.display == 'none' )
		{
		document.getElementById('nivelmapa1').style.display = 'block';
		}
		else{document.getElementById('nivelmapa1').style.display = 'none';}
	}
	function abrirnivel2(){
		if(document.getElementById('nivelmapa2').style.display == '' || document.getElementById('nivelmapa2').style.display == 'none' )
		{
		document.getElementById('nivelmapa2').style.display = 'block';
		}
		else{document.getElementById('nivelmapa2').style.display = 'none';}
	}
	function abrirnivel3(){
		if(document.getElementById('nivelmapa3').style.display == '' || document.getElementById('nivelmapa3').style.display == 'none' )
		{
		document.getElementById('nivelmapa3').style.display = 'block';
		}
		else{document.getElementById('nivelmapa3').style.display = 'none';}
	}
	function abrirnivel4(){
		if(document.getElementById('nivelmapa4').style.display == '' || document.getElementById('nivelmapa4').style.display == 'none' )
		{
		document.getElementById('nivelmapa4').style.display = 'block';
		}
		else{document.getElementById('nivelmapa4').style.display = 'none';}
	}
	function abrirnivel5(){
		if(document.getElementById('nivelmapa5').style.display == '' || document.getElementById('nivelmapa5').style.display == 'none' )
		{
		document.getElementById('nivelmapa5').style.display = 'block';
		}
		else{document.getElementById('nivelmapa5').style.display = 'none';}
	}
	