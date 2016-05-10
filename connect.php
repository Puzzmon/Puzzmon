<?php
function connect(){

	 /*
    $servername = "mysql.hostinger.es";
    $username = "u375670478_puzzm";
    $password = "Asdqwe123";
    $dbname = "u375670478_puzzm";
    */

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "puzzmon";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	mysqli_query($conn, "SET NAMES 'utf8'");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
}
function exp(){
	$sql = "SELECT Exp_actual FROM usuarios WHERE Id = '$_SESSION["Id"]'";
	$result = $conn->query($sql);
	return $result;
	}

?>