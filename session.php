<?php
// Start the session
session_start();
?>
<?php 
	session_unset();

	if (isset($_POST["logg"])){

		$user = $_POST["username"];
		$pass = $_POST["password"];
		//echo $user . " " . $pass;
		include "connection.php";
		$conn = connect();
		$sql = "SELECT * FROM usuarios WHERE Usuario = '".$user."'  AND Contraseña = '".$pass."';";
		$row = $conn->query($sql);
		if($row === FALSE) { 
		    die(mysql_error()); // TODO: better error handling
		    echo "error";
		}
		$row = $row->fetch_assoc();
		$_SESSION['username'] = $row["Usuario"];
		$_SESSION["passw"] = $row["Contraseña"];
		$_SESSION["email"] = $row["Email"];

		header('Location: '.$_SERVER['HTTP_REFERER']);

		$conn->close();
		
	}

	else if (isset($_POST["logg2"])){
		header('location: registro');
	}
?>