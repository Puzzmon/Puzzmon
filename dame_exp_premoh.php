<?php
// Start the session
session_start();
?>
<?php
include 'connection.php';
include 'checkNivel.php';
	
	$setexp = $_POST["setexp"];
	$setunlock = $_POST["unlock"];

	$conn = connect();
		
	$sql = "SELECT * FROM usuarios WHERE Id = '".$_SESSION['id']."'";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();

	$exp = $row["Exp_actual"];
	if ($setunlock == $row["nivelmapa"]){
		$setunlock = $setunlock+1;
		if ($setunlock >= 5){
			$setunlock = 5;
		}

	}
	else{
		$setunlock = $row["nivelmapa"];
	}

	$nuevaexp = $setexp + $exp;



    $sql = "UPDATE usuarios SET Exp_actual= '".$nuevaexp."', nivelmapa = '".$setunlock."' WHERE Id = '".$_SESSION['id']."'"; //Creamos el select
	$row = $conn->query($sql);

	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	checkNivel();
	header('Location: '.$_SERVER['HTTP_REFERER']);

?>