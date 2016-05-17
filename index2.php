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
	<script src="resources/js/validar.js"></script>
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
		<!-- DIV DE BOTONES -->
			<div id="buttons"> 
			<button class="btnlog" onclick="openlogin()">Log In</button>
			<button class="btnregister" onclick="openregister()">Register</button> 

			</div>
	<?php
		}
		else
		{
	?>	
		<!-- DIV TOP -->
		<div class='menu bienvenido'>
			<p>Bienvenido, <b><?=$_SESSION["username"]?></b></p>
		</div>
		<!-- DIV TOP -->
		<div class='menu top' style="display:none">
			<div id="top" class="col-md-3 col-xs-3 border"><b class="user" onclick="abrir_user()"> <?=$_SESSION["username"]?></b></div>
			<div id="top" class="col-md-3 col-xs-3 border"><b>Nivel: <?=$_SESSION["nivel"]?></b></div>
			<div id="top" class="col-md-offset-3 col-md-3 col-xs-offset-3 col-xs-3 border"><a href="cerrar_sesion.php">Log Out</a></div>
		</div>
	<?php		
		}	
		?>
		<div id="puzzmon" class="col-md-offset-4 col-md-3">
			<a href="index.html"><img class="puzzmon" src="resources/img/puzzmon2.png"/></a>
		</div>
		<!-- DIV DE LOGGIN -->
		<div id='loggin' style='display:none'>
			<form id='form' name='form' action='session.php' method='post'>
				<div id='block'>
					<label id='user' for='name'>p</label>
					<input type='text' name='username' id='name' placeholder='Username' required/>
					<label id='pass' for='password'>k</label>
					<input type='password' name='password' id='password' placeholder='Password' required/>
					<label class="atras" onclick="closelogin()">x</label>
					<input type='submit' id='submit' name='logg' value='a'/>
				</div>
			</form>
			<div id='option'>
				<a href='#'>forgot?</a>
			</div>
		</div>
		<!-- DIV DE REGISTRO -->
		<div id='register' style='display:none'>
			<form id='form' name='form' action='register.php' method='post' onsubmit="return validar(), okregister();">
				<div id='block2'>
					<label id='user' for='name'>p</label>
					<input type='text' name='username' id='username' placeholder='Username' required/>
					<p id='usererror' class="erroruser">*</p>
					<label id='pass' for='password'>k</label>
					<input type='password' name='password' id='passwd' placeholder='Password' required/>
					<p id='passerror' class="errorpw">*</p>
					<label id='email' for='email'>p</label>
					<input type='text' name='email' id='mail' placeholder='Email' required/>
					<p id='emailerror' class="erroremail">*</p>
					<label id='tipo' for='tipo' class="tipo" >1</label>
					<select name="tipo">
						<option value='1'>Planta</option>
						<option value='2'>Fuego</option>
						<option value='3'>Agua</option>
						<option value='4'>Luz</option>
						<option value='5'>Oscuridad</option>
					</select>
					<label class="atras" onclick="closeregister()">x</label>
					<input type='submit' id='submit' name='logg' value='a'/>
				</div>
			</form>
		</div>
		<!-- DIV DE USUARIO -->
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
							$exp = $_SESSION['exp'];
							$exp_total = $_SESSION['Exp_total'];
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
		<!-- DIV DE NIVELES DE MAPAS -->
		<div id="nivelmapas" class="col-md-3 col-xs-11 ">
			<div class="fondoniveles">
				<div id="niveles" class="niveles">
					<div id="nivel5" class="nivel col-md-12">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5.png" /></div>
					</div>
					<div id="nivel4" class="nivel col-md-12">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4.png" /></div>
					</div>
					<div id="nivel3" class="nivel col-md-12">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3.png" /></div>
					</div>
					<div id="nivel2" class="nivel col-md-12">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2.png" /></div>
					</div>
					<div id="nivel1" class="nivel col-md-12">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
			</div>
		</div>
</body>
</html>