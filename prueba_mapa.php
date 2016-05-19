<?php 
	session_start();
	include "connection.php";
	$json=JSON_DECODE($_GET["JSON"]);
	$level=$json->level;
	$response;

	$conn = connect();
	$sql = "SELECT * FROM mapas,  WHERE Id = ".$level.";";
	/*Select * 
FROM mapas M, monstruos Mo
WHERE M.Id = 1 
AND Mo.Id = (Select Puzzmon_1 from mapas where Id = 1);*/
	$result = mysqli_query($conn, $sql);

	while ($row = mysqli_fetch_assoc($result)){
		$map=$row;
	}
	
	if($map["Puzzmon_1"]){
		$sql = "SELECT * FROM monstruos,  WHERE Id = ".$map["Puzzmon_1"].";";
		$result = mysqli_query($conn, $sql);
		while ($row = mysqli_fetch_assoc($result)){
			$response[]=$row;
		}

	}


	mysqli_close($conn);
	echo JSON_ENCODE($response);
 ?>