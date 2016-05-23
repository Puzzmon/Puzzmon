<?php 
session_start();
 ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
	<script src="resources/js/jquery.js"></script>
	<script src="resources/js/bootstrap.js"></script>
	<script src="resources/js/head.js"></script>
	<?php
		if (isset($_POST["lvlid"]))
			$levelID = $_POST["lvlid"];
		else header('location: index.php');
		echo '<script> levelID = '.$levelID.'</script>';
	 ?>
	 <link rel="stylesheet" href="resources/css/bootstrap.css">
</head>
	
<body>
	<style>
		html{
			height: 100%;
		}
		body{
			height: 100%;
			background-color: pink;
			-webkit-touch-callout: none;
		    -webkit-user-select: none;
		    -khtml-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;}
		#game{
			width: 500px;
			height: 100%;

			
		}
		#battle{
			text-align: center;
			height: 40%;
			
		}
		#enemyZone{
			margin: auto;
			height: 50%;
		}
		#allyZone{
			margin: auto;
			height: 50%;
		}
		#grid{
			margin: auto;
			width: 70%;
			height: 55%;
		}
		#points{
			text-align: center;
		}
		.myProgress {
		    position: relative;
		    width: 60%;
		    height: 10px;
		    margin: auto;
		    background-color: grey;
		}
		.myBar {
		    position: absolute;
		    height: 100%;
		    background-color: green;
		}
	</style>
	<div id="game">
		<div id="battle">
			<div id="enemyZone"></div>
			<div id="allyZone"></div>
		</div>
		<div id="grid"></div>
	</div>
<script src="resources/js/onload.js"></script>

</body>
</html>