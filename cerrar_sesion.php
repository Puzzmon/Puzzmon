<?php
// Start the session
session_start();
?>
<?php 
	session_destroy();
	header('Location: '.$_SERVER['HTTP_REFERER']);
 ?>
