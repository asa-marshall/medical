<?php

session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";


if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else {

    $sql = " SELECT * FROM tblMed"+$_SESSION['Medical']+" WHERE fkClassDetailID="+$_SESSION['fkClassDetailID'];

    $permissions = $connection->runSelectQueryArrayNotEncoded($sql);
    $status = "ok";
    $errorMsg = "";
    $data = $permissions;

}
$output = array();
$output["status"] = $status;
$output["errorMsg"] = $errorMsg;
$output["data"] = $data;
echo json_encode($output);


?>