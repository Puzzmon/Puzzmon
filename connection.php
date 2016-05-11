<?php
//Conexion a BBDD con mysqli
function connect(){

    /*
    $servername = "mysql.hostinger.es";
    $username = "u375670478_puzzm";
    $password = "Asdqwe123";
    $tablename = "u375670478_puzzm";
    */
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $tablename = "puzzmon";
    
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $tablename) or die("Error " . mysqli_error($conn));
    mysqli_query($conn, "SET NAMES 'utf8'");
    // Check connection
    return $conn;
}
//Conexion con PDO para poder extraer 
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
 
  
?>