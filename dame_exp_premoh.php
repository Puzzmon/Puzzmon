<?php
// Start the session
session_start();
?>
<?php
include 'connection.php';
include 'checkNivel.php';
	
	$setexp = $_POST["setexp"];

	$conn = connect();
		
	$sql = "SELECT * FROM usuarios WHERE Id = '".$_SESSION['id']."'";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();

	$exp = $row["Exp_actual"];

	$nuevaexp = $setexp + $exp;



    $sql = "UPDATE usuarios SET Exp_actual= '".$nuevaexp."' WHERE Id = '".$_SESSION['id']."'"; //Creamos el select
	$row = $conn->query($sql);

	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	checkNivel();
	header('Location: '.$_SERVER['HTTP_REFERER']);

?>