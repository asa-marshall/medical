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
} else if (!isset($_SESSION['ClassDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else if (isset($_POST['SickCallDate']) && isset($_POST['SickCallDiagnosis']) && isset($_POST['SickCallMedicine'])){
	$classDetailID = $_SESSION['ClassDetailID'];
	$id = $_POST['MedSickCallID'];

	$date = $connection->getRightFormat($connection->sanitize($_POST['SickCallDate']));
    $visDate = '';
    $reason = '';

	$height = '';
	$weight = '';
	$temp = '';
	$bp = '';
	$pulse = '';
	$resp = '';

    $diagnosis = $connection->sanitize($_POST['SickCallDiagnosis']);
    $medicine = $connection->sanitize($_POST['SickCallMedicine']);
	$soap = '';

    if(isset($_POST['SickCallType'])) {
        $type = $_POST['SickCallType'];
        if(is_numeric($type)) {
            $type = intval($_POST['SickCallType']);
            $type = $connection->runSelectQuery("SELECT SickCallType FROM tlkpSickCallType WHERE AutoID=$type")->fetch_assoc();
        }
    } else {
        $type = 'Miscellaneous';
    }
    if(isset($_POST['DoctorVisitDate']))
    {
        $visDate = $connection->getRightFormat($connection->sanitize($_POST['DoctorVisitDate']));
    }
	if(isset($_POST['SickCallReason']))
	{
        $reason = $connection->sanitize($_POST['SickCallReason']);
	}

	if(isset($_POST['SickCallHeight']))
	{
        $height = $connection->sanitize($_POST['SickCallHeight']);
	}
	if(isset($_POST['SickCallWeight']))
	{
        $weight = $connection->sanitize($_POST['SickCallWeight']);
	}
	if(isset($_POST['Temperature']))
	{
        $temp = $connection->sanitize($_POST['Temperature']);
	}
	if(isset($_POST['BP']))
	{
        $bp = $connection->sanitize($_POST['BP']);
	}
	if(isset($_POST['Pulse']))
	{
        $pulse = $connection->sanitize($_POST['Pulse']);
	}
	if(isset($_POST['Respirations']))
	{
        $resp = $connection->sanitize($_POST['Respirations']);
	}

	if(isset($_POST['fkSOAPNoteID']))
	{
        $fkSOAPNoteID = $connection->sanitize($_POST['fkSOAPNoteID']);
	}
	
	$sql = "UPDATE tblMedSickCalls scall
			SET SickCallType = '$type', DoctorVisitDate = '$visDate', SickCallDate = '$date', SickCallDiagnosis = '$diagnosis', SickCallMedicine = '$medicine', SickCallReason = '$reason', 
				SickCallHeight = $height, SickCallWeight = $weight, Temperature = '$temp', BP = '$bp', Pulse = '$pulse', Respirations = '$resp'
			WHERE
				scall.fkClassDetailID = $classDetailID
			AND
				scall.MedSickCallID = $id";

    $data = $connection->runQuery($sql);
    $status ="ok";
    $errorMsg="";
} else {
	$status = "error";
    $errorMsg = "You must enter Date, Diagnosis, and Medicine!";
}
$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>