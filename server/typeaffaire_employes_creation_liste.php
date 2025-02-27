<?php
require_once 'gdt/cldbgoeland.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['idtypeaffaire'])) {
    $idTypeAffaire = $_GET['idtypeaffaire'];
    $dbgo = new DBGoeland();
    $dbgo->queryRetJson2("cn_TypeAffaire_employe_droitcreation_liste2 $idTypeAffaire");
    echo $dbgo->resString;
    unset($dbgo);
} else {
    echo '[]';
}
