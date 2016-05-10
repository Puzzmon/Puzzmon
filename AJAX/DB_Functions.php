<?php
// Start the session
session_start();
?>
<?php
 
function conectar() {
        /*
    $db_host = "mysql.hostinger.es";
    $db_user = "u375670478_puzzm";
    $db_password = "Asdqwe123";
    $db_database = "u375670478_puzzm";
    */


    $db_host = "localhost"; //host donde se encuentra la base de datos
    $db_user = "root"; //Usuario de la base de datos
    $db_password = ""; //Contraseña de la base de datos
    $db_database = "puzzmon"; //Nombre de base de datos
    return new PDO('mysql:host='.$db_host.';dbname='.$db_database.';charset=UTF8', $db_user, $db_password); //Cadena de conexión al PDO
}
 

 
/**
* Comprueba si existe el usuario
*/
 
function getExp() {
 
    $db = conectar(); //Conectamos a la base de datos
 
    $sql = "SELECT Exp_actual from usuarios WHERE Id = 1"; //Creamos el select
 
    $query = $db->query($sql); //ejecutamos el Select
    
    $usuarioDB = $query-> fetch(PDO::FETCH_ASSOC); // Guardamos los registros que devuelve la SELECT en un array asociativo
    
    $exp = $usuarioDB['Exp_actual']; //Guardamos la experiencia
       
    $_SESSION['Exp_actual'] = $exp;

    return $exp; //Devolvemos la experiencia

}

 
?>