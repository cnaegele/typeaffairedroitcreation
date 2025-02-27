<?php
header("Access-Control-Allow-Origin: *");
if (!function_exists('cgalert')) {
    require_once "stdlib.php";
}
require_once 'gdt/cldbgoeland.php';

$userLogin = 'inconnu';
//pour le développement qui n'a pas de F5
$serveur = 'inconnu';
if (isset($_SERVER['HTTP_HOST'])) {
    $serveur = $_SERVER['HTTP_HOST'];
}
if ($serveur == 'mygolux.lausanne.ch') {
    $userLogin = 'sgca0047';
} else {
    if (isset($_SERVER['HTTP_USERID'])) {
        $userLogin = $_SERVER['HTTP_USERID'];
    } else {
        //Pas de F5
        echo '{"message":"Pas de F5, établir une connection depuis le menu"}';
        die;
    }
}

$groupeSecurite = '';
if (isset($_GET['groupesecurite'])) {
    $groupeSecurite = $_GET['groupesecurite'];
}
$sqlQuery = "cn_employe_data_login '$userLogin'";
if ($groupeSecurite == '') {
    $sqlQuery .= ",NULL";
} else {
    $groupeSecurite = str_replace("'", "''", $groupeSecurite);
    $sqlQuery .= ",'$groupeSecurite'";
}
$dbgo = new DBGoeland();
$bret = $dbgo->queryRetArray($sqlQuery);
if ($bret === true) {
    $resA = $dbgo->resArray;
    unset($dbgo);
    if (count($resA) == 0) {
        echo '{"message":"' . "Votre compte $userLogin n'est pas connu par goéland. Veuillez prendre contact avec le support goéland." . '"}';
    } else {
        $row = $resA[0];
        if ($row['bactif'] != 1) {
            echo '{"message":"' . "Votre compte $userLogin est désactivé. Veuillez prendre contact avec le support goéland." . '"}';
        } else {
            echo json_encode($row);
        }
    }
} else {
    echo '{"message" : "' . $dbgo->resErreur . '"}';
    unset($dbgo);
}
