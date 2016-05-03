<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- Links Bootstrap css -->
	<link rel="styleSheet" href="css/bootstrap.min.css"> 
	<link rel="styleSheet" href="css/bootstrap.css">
	<!-- Link css propio -->
	<link rel="styleSheet" href="css/estilos.css">
	<!-- Link javascript y jquery -->
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
	
	<title>PuzzMon</title>
</head>
<body>
	<div class="background">
			<video src="AnimatronJaja.mp4" autoplay loop></video>
		</div>
	<div class="floatlogin">
			<?php  
			if (empty($_SESSION["username"])){
				echo
					'<form action="session.php", method="post">
						<input class="loggin" type="text" name="username"></input>
						<input class="loggin" type="password" name="password"></input>
						<input class="logg" type="submit" name="logg" value="Entrar"></input>
					</form>'
				;
			}
			else {
				echo '<div class="logphp">';
				echo '<p>Bienvenido, <b>' . $_SESSION["username"] . '</b></p>';
				echo '</div>';
			}
			?>
		</div>
		
	
</body>
</html>