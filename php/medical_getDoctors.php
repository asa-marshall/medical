<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";

if(isset($_SESSION['thisDetailID'])){
    $classID = $_SESSION['thisDetailID'];
}

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['thisDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else {
	$classDetailID = $_SESSION['ClassDetailID'];
	
	$sql = "SELECT DoctorID, DoctorType, DoctorName, DoctorEmail, PracticeName, PracticeAddress,
				   PracticeContactPhone, PracticeContactFax
			FROM tblPrimaryDoctors
			WHERE fkClassDetailID = $classID";
	
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