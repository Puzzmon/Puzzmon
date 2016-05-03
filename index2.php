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
	
	<title>PuzzMon</title>
</head>
<body>
	<div class="background">
		<video src="resources/src/AnimatronJaja.mp4" autoplay loop></video>
	</div>
	<?php  
		if (empty($_SESSION["username"]))
		{
			echo"<div class='loggin'>";
			echo"<form id='form' name='form' action='session.php' method='post'>";
			echo"<div id='block'>";
			echo"<label id='user' for='name'>p</label>";
			echo"<input type='text' name='username' id='name' placeholder='Username' required/>";
			echo"<label id='pass' for='password'>k</label>";
			echo"<input type='password' name='password' id='password' placeholder='Password' required/>";
			echo"<input type='submit' id='submit' name='logg' value='a'/>";
			echo"</div>";
			echo"</form>";
			echo"<div id='option'>";
			echo"<p>Sign in</p>";
			echo"<a href='#'>forgot?</a>";
			echo"</div>";
			echo"</div>";
		}
		else
		{
			echo"<nav class='menu'>";
			echo 'Bienvenido, <b>' . $_SESSION["username"] . '</b>';
			echo '</nav>';
		}
	?>
		
	
</body>
</html>