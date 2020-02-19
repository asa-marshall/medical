<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

if(isset($_SESSION['thisDetailID'])){
    $classID = $_SESSION['thisDetailID'];
}


$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['thisDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else {

	$sql = "SELECT MedSickCallID, SickCallType, SickCallDate, DoctorVisitDate, SickCallReason, SickCallHeight, SickCallWeight,
				   Temperature, BP, Pulse, Respirations, SickCallDiagnosis, SickCallMedicine
			FROM tblMedSickCalls scall
			WHERE scall.fkClassDetailID = $classID";
	
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