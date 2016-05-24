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
		$_SESSION['id'] = $row["Id"];
		$_SESSION['username'] = $row["Usuario"];
		$_SESSION['email'] = $row["Email"];
		$_SESSION['exp'] = $row["Exp_actual"];
		$_SESSION['nivel'] = $row["Nivel"];
		$_SESSION['mascota'] = $row["Puzzmon_Id"];
		$_SESSION['nivelmapa'] = $row["nivelmapa"];
		
		$sql = "SELECT experiencia FROM experiencia WHERE nivel = '".$_SESSION['nivel']."';";
		$row = $conn->query($sql);
		if($row === FALSE) { 
		    die(mysql_error()); // TODO: better error handling
		    echo "error";
		}
		$row = $row->fetch_assoc();
		$_SESSION['Exp_total'] = $row['experiencia'];

		$conn->close();
		
		header('Location: '.$_SERVER['HTTP_REFERER']);
	
	}

	else if (isset($_POST["logg2"])){
		header('location: registro');
	}
?>