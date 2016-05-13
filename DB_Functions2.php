<?php
// Start the session
session_start();
?>
<?php
include 'connection.php';

function getExpTotal() {
 
    $db = conectar(); //Conectamos a la base de datos
 
    $sql = "SELECT experiencia from experiencia WHERE nivel = '".$_SESSION['nivel']."'"; //Creamos el select
 
    $query = $db->query($sql); //ejecutamos el Select
    
    $usuarioDB = $query-> fetch(PDO::FETCH_ASSOC); // Guardamos los registros que devuelve la SELECT en un array asociativo
    
    $exp_total = $usuarioDB['experiencia']; //Guardamos la experiencia_total
        
    return $exp_total; //Devolvemos la experiencia_total
}

echo getExpTotal();
 
?>