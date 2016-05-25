<?php 
	session_start();
	include "connection.php";
	$json=JSON_DECODE($_GET["JSON"]);
	$level=$json->level;
	$response = array(
		'character' => array(
			'ID' => 0,
			'Name' => '',
			'Type' => 0,
			'Level' => 0,
			'HP' => 0,
			'Atk' => 0,
			'Def' => 0
		),
		'enemy1' => array(
			'ID' => 0,
			'Name' => '',
			'Type' => 0,
			'Level' => 0,
			'HP' => 0,
			'Atk' => 0,
			'Def' => 0,
			'Exp' => 0,
			'Unlock' => 1
		),
		'enemy2' => array(
			'ID' => 0,
			'Name' => '',
			'Type' => 0,
			'Level' => 0,
			'HP' => 0,
			'Atk' => 0,
			'Def' => 0
		),
		'enemy3' => array(
			'ID' => 0,
			'Name' => '',
			'Type' => 0,
			'Level' => 0,
			'HP' => 0,
			'Atk' => 0,
			'Def' => 0
		)
	);

	$conn = connect();
	$sql = "SELECT * FROM usuarios WHERE Id = ".$_SESSION["id"].";";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();
	$response["character"]["ID"] = (int)$row["Puzzmon_Id"];
	$response["character"]["Level"] = (int)$row["Nivel"];

	$sql = "SELECT * FROM monstruos WHERE Id = ".$response["character"]["ID"].";";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();
	$response["character"]["Type"] = (int)$row["Type"];
	$response["character"]["Name"] = $row["Nombre"];
	$response["character"]["HP"] = floor($row["Hp_Base"] + $row["Hp_Base"] * $row["Hp_Inc"] * ($response["character"]["Level"] -1));
	$response["character"]["Atk"] = floor($row["Atk_Base"] + $row["Atk_Base"] * $row["Atk_Inc"] * ($response["character"]["Level"] -1)); 
	$response["character"]["Def"] = floor($row["Def_Base"] + $row["Def_Base"] * $row["Def_Inc"] * ($response["character"]["Level"] -1)); 

	
	$sql = "SELECT * FROM mapas  WHERE Id = ".$level.";";
	$result = mysqli_query($conn, $sql);

	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	}
	$row = $row->fetch_assoc();
	$response["enemy1"]["ID"] = (int)$row["Puzzmon_1"];
	$response["enemy1"]["Level"] = (int)$row["Nivel_1"];
	$response["enemy1"]["Exp"] = (int)$row["Experiencia"];
	$response["enemy1"]["Unlock"] = (int)$row["Dificultad"];


	if ($row["Puzzmon_2"] != null){
		$response["enemy2"]["ID"] = (int)$row["Puzzmon_2"];
		$response["enemy2"]["Level"] = (int)$row["Nivel_2"];
	}
	if ($row["Puzzmon_3"] != null){
		$response["enemy3"]["ID"] = (int)$row["Puzzmon_3"];
		$response["enemy3"]["Level"] = (int)$row["Nivel_3"];
	}

	$sql = "SELECT * FROM monstruos WHERE Id = ".$response["enemy1"]["ID"].";";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();
	$response["enemy1"]["Type"] = (int)$row["Type"];
	$response["enemy1"]["Name"] = $row["Nombre"];
	$response["enemy1"]["HP"] = floor($row["Hp_Base"] + $row["Hp_Base"] * $row["Hp_Inc"] * ($response["enemy1"]["Level"] -1));
	$response["enemy1"]["Atk"] = floor($row["Atk_Base"] + $row["Atk_Base"] * $row["Atk_Inc"] * ($response["enemy1"]["Level"] -1)); 
	$response["enemy1"]["Def"] = floor($row["Def_Base"] + $row["Def_Base"] * $row["Def_Inc"] * ($response["enemy1"]["Level"] -1)); 

	if($response["enemy2"]["ID"] != 0){
		$sql = "SELECT * FROM monstruos WHERE Id = ".$response["enemy2"]["ID"].";";
		$row = $conn->query($sql);
		if($row === FALSE) { 
		    die(mysql_error()); // TODO: better error handling
		    echo "error";
		}
		$row = $row->fetch_assoc();
		$response["enemy2"]["Type"] = (int)$row["Type"];
		$response["enemy2"]["Name"] = $row["Nombre"];
		$response["enemy2"]["HP"] = floor($row["Hp_Base"] + $row["Hp_Base"] * $row["Hp_Inc"] * ($response["enemy2"]["Level"] -1));
		$response["enemy2"]["Atk"] = floor($row["Atk_Base"] + $row["Atk_Base"] * $row["Atk_Inc"] * ($response["enemy2"]["Level"] -1)); 
		$response["enemy2"]["Def"] = floor($row["Def_Base"] + $row["Def_Base"] * $row["Def_Inc"] * ($response["enemy2"]["Level"] -1)); 
	}

	if($response["enemy3"]["ID"] != 0){
		$sql = "SELECT * FROM monstruos WHERE Id = ".$response["enemy3"]["ID"].";";
		$row = $conn->query($sql);
		if($row === FALSE) { 
		    die(mysql_error()); // TODO: better error handling
		    echo "error";
		}
		$row = $row->fetch_assoc();
		$response["enemy3"]["Type"] = (int)$row["Type"];
		$response["enemy3"]["Name"] = $row["Nombre"];
		$response["enemy3"]["HP"] = floor($row["Hp_Base"] + $row["Hp_Base"] * $row["Hp_Inc"] * ($response["enemy3"]["Level"] -1));
		$response["enemy3"]["Atk"] = floor($row["Atk_Base"] + $row["Atk_Base"] * $row["Atk_Inc"] * ($response["enemy3"]["Level"] -1)); 
		$response["enemy3"]["Def"] = floor($row["Def_Base"] + $row["Def_Base"] * $row["Def_Inc"] * ($response["enemy3"]["Level"] -1)); 
	}


	$conn->close();
	echo JSON_ENCODE($response);
 ?>