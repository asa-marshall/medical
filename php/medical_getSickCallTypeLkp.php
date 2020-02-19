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
    $sql = "SELECT *
			FROM tlkpSickCallType;";

    $data = $connection->runSelectQueryArrayNotEncoded($sql);
    $status = "ok";
    $errorMsg = "";
}
$output = array();
$output['value'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>