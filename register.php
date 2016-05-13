<?php
// Start the session
session_start();
?>
<?php 


	function createUser ($us, $pwd, $mail){
	include "connection.php";

	$conn = connect();
	$sql = "INSERT INTO usuarios values (NULL,'".$us."', '".$pwd."', '".$mail."', '0', '1');";
        if ($conn->query($sql) === TRUE) {
    return true;
        } else {
            return false;
        }
        $conn->close();

	}
	if(createUser($_POST["username"],$_POST["password"],$_POST["email"]))
	{
	session_unset();
		$conn = connect();
		$user = $_POST["username"];
		$pass = $_POST["password"];
		//echo $user . " " . $pass;
	
		$sql = "SELECT * FROM usuarios WHERE Usuario = '".$user."'  AND Contraseña = '".$pass."';";
		$row = $conn->query($sql);
		if($row === FALSE) { 
		    die(mysql_error()); // TODO: better error handling
		    echo "error";
		}
		$row = $row->fetch_assoc();
		$_SESSION['id'] = $row["Id"];
		$_SESSION['username'] = $row["Usuario"];
		$_SESSION['passw'] = $row["Contraseña"];
		$_SESSION['email'] = $row["Email"];
		$_SESSION['exp'] = $row["Exp_actual"];
		$_SESSION['nivel'] = $row["Nivel"];

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

?>