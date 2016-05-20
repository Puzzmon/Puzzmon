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
			<h2>Bienvenido, <b><?=$_SESSION["username"]?></b></h2>
		</div>
		<!-- DIV TOP -->
		<div class='menu top' style="display:none">
			<div id="top" class="col-md-3 col-xs-3 border"><b class="user" onclick="abrir_user()"> <?=$_SESSION["username"]?></b></div>
			<div id="top" class="col-md-3 col-xs-3 border"><b>Nivel: <?=$_SESSION["nivel"]?></b></div>
			<div id="top" class="col-md-3 col-xs-3 border">
				<form action='dame_exp_premoh.php' method='POST'>
					<input type="text" name="setexp"></input>
					<input type="submit" style="width:10px"></input>
				</form>
			</div>
			<div id="top" class="col-md-3 col-xs-3 border"><a href="cerrar_sesion.php">Log Out</a></div>
		</div>
	<?php		
		}	
		?>
		<div id="puzzmon" class="col-md-offset-4 col-md-3">
			<img class="puzzmon" src="resources/img/puzzmon4.png"/>
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
						<option value='1'>Samuleaf</option>
						<option value='2'>Lampkin</option>
						<option value='3'>Droppentice</option>
						<option value='4'>Placeholder</option>
						<option value='5'>Wingskull</option>
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
							$sql = "SELECT Exp_actual FROM usuarios WHERE Id = '".$_SESSION['id']."'" or die('Error: ' . mysql_error());
							$row = $conn->query($sql);
							if ($row == false){
								die(mysql_error());
							}
							$row = $row->fetch_assoc();
							$exp = $row["Exp_actual"];
							$exp_total = $_SESSION['Exp_total'];
							$porcentaje = ($exp * 100 ) / $exp_total; 
							$porcentaje = floor($porcentaje);
							
							
						?>
						<p>Nivel: <?=$_SESSION["nivel"]?>  EXP: <span id="Userexp"></span>/<span id="Userexptotal"></span></p> <!-- CALCULAR LA EXPERIENCIA exp actual * 100% / exp nivel -->
						<div class="progress progress-striped active">

						  <div id="barraExp" class="progress-bar progress-bar-custom" role="progressbar" >
						  	 
						   <p id="barraExptext" style="text-align:center; color:black">%<p>
						  </div>
						</div>
					</div>
					<div class="UserIcon col-md-6 col-xs-6">
						<?php
						if($_SESSION['mascota']==1)
						{
						?>
						<img src="resources/img/iconuser_1.png"></img>
						<?php	
						}
						else if($_SESSION['mascota']==2)
						{
						?>
						<img src="resources/img/iconuser_2.png"></img>
						<?php	
						}
						else if($_SESSION['mascota']==3)
						{
						?>
						<img src="resources/img/iconuser_3.png"></img>
						<?php	
						}
						else if($_SESSION['mascota']==4)
						{
						?>
						<img src="resources/img/iconuser_4.png"></img>
						<?php	
						}
						else if($_SESSION['mascota']==5)
						{
						?>
						<img src="resources/img/iconuser_5.png"></img>
						<?php	
						}
						?>

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
		<?php
		if (!empty($_SESSION["username"])){
		?>	
		<div id="nivelmapas" class="col-md-3 col-xs-11 " style="display:none">
			<div class="fondoniveles">
				<?php							
					$sql = "SELECT * FROM usuarios WHERE Id = '".$_SESSION['id']."';" or die('Error: ' . mysql_error());
					$row = $conn->query($sql);
					if ($row == false){
						die(mysql_error());
					}
					$row = $row->fetch_assoc();							
					
					$nivelmapa = $row['nivelmapa'];

				if($nivelmapa == 5)
				{
				?>
				<div id="niveles" class="niveles">
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(5)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(4)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(3)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(2)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(1)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
				<?php
				}
				else if($nivelmapa == 4)
				{
				?>
				<div id="niveles" class="niveles">
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(4)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(3)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(2)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(1)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
				<?php
				}
				else if($nivelmapa == 3)
				{
				?>
				<div id="niveles" class="niveles">
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4d.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(3)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(2)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(1)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
				<?php
				}
				else if($nivelmapa == 2)
				{
				?>
				<div id="niveles" class="niveles">
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4d.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(2)">
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(1)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
				<?php
				}
				else if($nivelmapa == 1)
				{
				?>
				<div id="niveles" class="niveles">
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel5d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star5d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel4d.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star4d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel3d.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star3d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 disabled" >
						<div class="center right col-md-6 img"><img src="resources/img/Monsters/75x75/nivel2d.png" /></div>
						<div class="center left col-md-6 img"><img class="center" src="resources/img/Monsters/star2d.png" /></div>
					</div>
					<div id="nivel" class="nivel col-md-12 enabled" onclick="abrirnivel(1)">
						<div class="center left col-md-6 img"><img src="resources/img/Monsters/75x75/nivel1.png" /></div>
						<div class="center right col-md-6 img"><img class="center" src="resources/img/Monsters/star1.png" /></div>
					</div>
				</div>
				<?php
				}
				?>
			</div>
		</div>
		<?php
		}
		?>
		<!-- DIV DE NIVELES DE MAPAS -->
		<div id="nivelmapa1" class="nivelmapa col-md-offset-3 col-md-9 col-xs-12">
			<h1>MONZTRUO 1</h1>
			<div class="textnivel col-md-4 col-xs-12" style="color:white" >
				<p>
				Esto es un Monstruo de nivel 1 Ojcuro
				</p>
			</div>
			<div class="imagenivel col-md-8 col-xs-12" >
				<div class="Image1 col-md-12 col-xs-12" >
				</div>
				<div class="formsend " >
					<form action="play.php" method="POST">
						<input value="1" style="display:none" name="lvlid" />
						<input type="submit" value="Jugar"/>
					</form>
				</div>
			</div>
		</div>
		<div id="nivelmapa2" class="nivelmapa col-md-offset-3 col-md-9 col-xs-12">
			<h1>MONZTRUO 2</h1>
			<div class="textnivel col-md-4 col-xs-12" style="color:white" >
				<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<div class="imagenivel col-md-8 col-xs-12" >
				<div class="Image2 col-md-12 col-xs-12" >
				</div>
				<div class="formsend " >
					<input type="submit" value="Jugar"/>
				</div>
			</div>
		</div>
		<div id="nivelmapa3" class="nivelmapa col-md-offset-3 col-md-9 col-xs-12">
			<h1>MONZTRUO 3</h1>
			<div class="textnivel col-md-4 col-xs-12" style="color:white" >
				<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<div class="imagenivel col-md-8 col-xs-12" >
				<div class="Image3 col-md-12 col-xs-12" >
				</div>
				<div class="formsend " >
					<input type="submit" value="Jugar"/>
				</div>
			</div>
		</div>
		<div id="nivelmapa4" class="nivelmapa col-md-offset-3 col-md-9 col-xs-12">
			<h1>MONZTRUO 4</h1>
			<div class="textnivel col-md-4 col-xs-12" style="color:white" >
				<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<div class="imagenivel col-md-8 col-xs-12" >
				<div class="Image4 col-md-12 col-xs-12" >
				</div>
				<div class="formsend " >
					<input type="submit" value="Jugar"/>
				</div>
			</div>
		</div>
		<div id="nivelmapa5" class="nivelmapa col-md-offset-3 col-md-9 col-xs-12">
			<h1>MONZTRUO 5</h1>
			<div class="textnivel col-md-4 col-xs-12" style="color:white" >
				<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
			<div class="imagenivel col-md-8 col-xs-12" >
				<div class="Image5 col-md-12 col-xs-12" >
				</div>
				<div class="formsend " >
					<input type="submit" value="Jugar"/>
				</div>
			</div>
		</div>
</body>
</html>