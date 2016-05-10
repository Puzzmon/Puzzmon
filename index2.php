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
	<link rel="styleSheet" href="resources/css/form.css">
	<!-- Link javascript y jquery -->
	<script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/mijs.js"></script>
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
			<button class="btnregister" onclick="openregister()">Register</button> 

			</div>
	<?php
		}
		else
		{
	?>	
		<div class='menu bienvenido'>
			<p>Bienvenido, <b><?=$_SESSION["username"]?></b></p>
		</div>
		<div class='menu top' style="display:none">
			<div id="top" class="col-md-3 col-xs-3 border">Name:<b class="user" onclick="abrir_user()"> <?=$_SESSION["username"]?></b></div>
			<div id="top" class="col-md-3 col-xs-3 border"><b>Nivel: <?=$_SESSION["nivel"]?></b></div>
			<div id="top" class="col-md-offset-3 col-md-3 col-xs-offset-3 col-xs-3 border"><a href="cerrar_sesion.php">Log Out</a></div>
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
		<div id='register' style='display:none'>
			<form id='form' name='form' action='register.php' method='post'>
				<div id='block2'>
					<label id='user' for='name'>p</label>
					<input type='text' name='username' id='name' placeholder='Username' required/>
					<label id='pass' for='password'>k</label>
					<input type='password' name='password' id='password' placeholder='Password' required/>
					<label id='email' for='email'>p</label>
					<input type='text' name='email' id='name' placeholder='Email' required/>
					<input type='submit' id='submit' name='logg' value='a'/>
				</div>
			</form>
		</div>
		<div id="User">
			<div class="fondotransparente">
				<div class="fondoUser">
					<div class="cerrar" onclick="cerrar_user()"></div>
					<div class="User col-md-6 col-xs-6">
						<b><?=$_SESSION["username"]?></b>
						<hr>
						<?php
							include 'connection.php';
							$conn = connect();
							$sql = "SELECT Exp_actual FROM usuarios WHERE Id = 1;" or die('Error: ' . mysql_error());
							$row = $conn->query($sql);
							if ($row == false){
								die(mysql_error());
							}
							$row = $row->fetch_assoc();
							$exp = 
							$exp_total = 1000;
							$porcentaje = ($exp * 100 ) / $exp_total; 
							
							?>
						<p>Nivel: <?=$_SESSION["nivel"]?>  EXP: <span id="Userexp"></span>/<span id="Userexptotal"></span></p> <!-- CALCULAR LA EXPERIENCIA exp actual * 100% / exp nivel -->
						<div class="progress progress-striped active">

						  <div id="barraExp" class="progress-bar progress-bar-custom" role="progressbar" >
						  	 
						   <p id="barraExptext" style="text-align:center; color:black">%<p>
						  </div>
						</div>
					</div>
					<div class="UserIcon col-md-6 col-xs-6">
						<img src="resources/img/iconuser_1.png"></img>
					</div>
					<div class="Estadisticas col-md-12">
						<b>Estadisticas</b>
						<hr>
						<p>Poder : 100</p>
						<p>Defensa : 50</p>
					</div> 
				</div>	
			</div>
		</div>

	
</body>
</html>