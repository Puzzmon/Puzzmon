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
	<link rel="styleSheet" href="resources/css/user.css">
	<!-- Link javascript y jquery -->
	<script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.js"></script>
    <script src="resources/js/bootstrap.min.js"></script>
<head>
<body>
	<div class="fondotransparente">
		<div class="fondoUser">
					<div class="cerrar" onclick="cerrar_user()"></div>
					<div class="User col-md-6">
						<b><?=$_SESSION["username"]?></b>
						<hr>
						<p>Nivel: <?=$_SESSION["nivel"]?>  EXP: <?=$_SESSION["exp"]?>/1000</p> <!-- CALCULAR LA EXPERIENCIA exp actual * 100% / exp nivel -->
						<div class="progress progress-striped active">
							<?php
							$exp = experiencia();
							$exp_total = '1000';
							$porcentaje = ($exp * 100)/ $exp_total; 
							?>
						  <div class="progress-bar" role="progressbar" style="width:<?php echo $porcentaje ?>%">
						   <p style="text-align:center; color:black"><?=$porcentaje?>%</p>
						  </div>
						</div>
					</div>
					<div class="Mascota col-md-12">
						<p>nombre Mascota</p>
						<hr>
						<p>Clase</p>
						<hr>
						<p>estados/nivel</p>
					</div> 
				</div>	
	</div>	
</body>
</html>    