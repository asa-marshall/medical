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
} else if (!isset($_SESSION['thisDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else {
	$soapNoteID = $_SESSION['SOAPNoteID'];

	$sql = "SELECT SOAPNoteID, SubjectiveObjectiveSummary, PlanSummary, SOAPFilepath
			FROM tblSOAPNotes soap
			WHERE soap.SOAPNoteID = '$soapNoteID'";
	
    $data = $connection->runSelectQueryArrayNotEncoded($sql);
    $status = "ok";
    $errorMsg = "";
}
$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>