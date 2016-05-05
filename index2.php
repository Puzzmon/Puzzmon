<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- Links Bootstrap css -->
	<link rel="styleSheet" href="resources/css/bootstrap.min.css"> 
	<link rel="styleSheet" href="resources/css/bootstrap.css">
	<!-- Link css propio -->
	<link rel="styleSheet" href="resources/css/estilos.css">
	<!-- Link javascript y jquery -->
	<script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>
	<script type="text/javascript">
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
	</script>
	<script type="text/javascript">
	function openlogin(){
		document.getElementById('buttons').style.display = 'none';
		document.getElementById('loggin').style.display = 'block';
	}
	function openregister(){
		document.getElementById('buttons').style.display = 'none';
		document.getElementById('register').style.display = 'block';
	}

	</script>
	<title>PuzzMon</title>
</head>
<body>
	<div class="background">
		<video src="resources/src/AnimatronJaja.mp4" autoplay loop></video>
	</div>
	<?php  
		if (empty($_SESSION["username"]))
		{
	?>
			<div id="buttons"> 
			<button class="btnlog" onclick="openlogin()">Log In</button>
			<button class="btnregister" onlick="openregister()">Register</button> 

			</div>
	<?php
		}
		else
		{
	?>	
			<div class='menu bienvenido'>
				<p>Bienvenido, <b><?=$_SESSION["username"]?></b></p>
			</div>
			<div class='row menu top' style="display:none">
				<div id="top" class="col-md-3 border"><b>Name: <?=$_SESSION["username"]?></b></div>
				<div id="top" class="col-md-3 border"><b>Nivel: X</b></div>
				<div id="top" class="col-md-offset-3 col-md-3 border"><a href="#">Log Out</a></div>
			</div>
	<?php		
		}	
		?>
			<div id='loggin' style='display:none'>
			<form id='form' name='form' action='session.php' method='post'>
			<div id='block'>
			<label id='user' for='name'>p</label>
			<input type='text' name='username' id='name' placeholder='Username' required/>
			<label id='pass' for='password'>k</label>
			<input type='password' name='password' id='password' placeholder='Password' required/>
			<input type='submit' id='submit' name='logg' value='a'/>
			</div>
			</form>
			<div id='option'>
			<a href='#'>forgot?</a>
			</div>
			</div>
	
</body>
</html>