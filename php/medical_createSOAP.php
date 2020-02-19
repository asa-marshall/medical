<?php
/*session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['MedSickCallID'])) {
    $status = "error";
    $errorMsg = "You must select a reference Sick Call first!";
} else if (isset($_POST['SubjectiveObjectiveSummary']) && isset($_POST['PlanSummary'])){
	$scallID = $_POST['MedSickCallID'];
	$soSummary = $_POST['SubjectiveObjectiveSummary'];
	$planSummary = $_POST['PlanSummary'];
	$file = 'NULL';
	
	if(isset($_POST['SOAPFilepath']))
	{
		$file = $_POST['SOAPFilepath'];
	}
	
	$sql = "INSERT INTO tblSOAPNotes (fkMedSickCallID, SubjectiveObjectiveSummary, PlanSummary, SOAPFilepath)
			VALUES ($scallID, '$soSummary', '$planSummary', '$file')";
	
    $data = $connection->runQuery($sql);
    $status = "ok";
    $errorMsg = "";
} else {
	$status = "error";
    $errorMsg = "You must provide a Sick Call ID, and Subjective/Objective and Plan Summaries!";
}
$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);*/
?>