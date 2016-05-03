<?php

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
     
?>