<?php
// Start the session
session_start();
?>
<?php
include 'connection.php';

function getExp() {
 
    $db = conectar(); //Conectamos a la base de datos
 
    $sql = "SELECT Exp_actual from usuarios WHERE Id = '".$_SESSION['id']."'"; //Creamos el select
 
    $query = $db->query($sql); //ejecutamos el Select
    
    $usuarioDB = $query-> fetch(PDO::FETCH_ASSOC); // Guardamos los registros que devuelve la SELECT en un array asociativo
    
    $exp = $usuarioDB['Exp_actual']; //Guardamos la experiencia
        
    return $exp; //Devolvemos la experiencia
}

echo getExp();
 
?>