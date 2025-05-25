<?php 
session_start();


if (isset($_GET['page'])) {   
    if(file_exists("controleur/".$_GET['page'].".controleur.php"))
        $page = $_GET['page'];
    else
        $page = "404";
} 


ob_start();
require "controleur/".$page.".controleur.php";
$content = ob_get_contents();
ob_get_clean();

require "nav.php";

?>