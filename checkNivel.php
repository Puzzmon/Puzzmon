<?php


function checkNivel(){
	$conn = connect();
		
	$sql = "SELECT * FROM usuarios WHERE Id = '".$_SESSION['id']."'";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error()); // TODO: better error handling
	    echo "error";
	}
	$row = $row->fetch_assoc();

	$exp = $row["Exp_actual"];
	$nivel = $row["Nivel"];

	$sql = "SELECT experiencia FROM experiencia WHERE nivel = '".$nivel."' ";
	$row = $conn->query($sql);
	if($row === FALSE) { 
	    die(mysql_error());
	    echo "error";
	}
	$row = $row->fetch_assoc();
	$exp_total = $row['experiencia'];

	if($exp >= $exp_total)
	{
		$exp = $exp - $exp_total;
		$nivel += 1;
		$_SESSION['nivel'] = $nivel;
		$sql = "UPDATE usuarios SET Exp_actual= '".$exp."', Nivel = '".$nivel."' WHERE Id = '".$_SESSION['id']."'"; //Creamos el select
		$row = $conn->query($sql);
	}
}
?>