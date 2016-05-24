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
	 <link rel="stylesheet" href="resources/css/play.css">
</head>
<body>
	<div id="content" class="border">
		<div class="left border col-md-4 col-xs-1"></div>
		<div class="game border col-md-4 col-xs-10">
			<div id="game">
		<div id="battle" class="border">
			<div id="enemyZone" class="border"></div>
			<div id="allyZone" class="border"></div>
		</div>
		<div id="grid" class="border"></div>
	</div> 
		</div>
		<div class="right border col-md-4 col-xs-1"></div>
	</div>

	
<script src="resources/js/onload.js"></script>

</body>
</html>