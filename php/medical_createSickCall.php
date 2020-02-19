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
	$classDetailID = $_SESSION['thisDetailID'];

	$date = '';
    $visDate = '';
    $reason = '';

    $height = '';
    $weight = '';
    $temp = '';
    $bp = '';
    $pulse = '';
    $resp = '';

	$diagnosis = '';
	$medicine = '';
	$soap = ''; //?

    if(isset($_POST['SickCallType'])) {
        $type = $_POST['SickCallType'];
        if(is_numeric($type)) {
            $type = intval($_POST['SickCallType']);
            $type = $connection->runSelectQuery("SELECT SickCallType FROM tlkpSickCallType WHERE AutoID=$type")->fetch_assoc();
        }
    } else {
        $type = 'Miscellaneous';
    }
    if(isset($_POST['SickCallDate']))
    {
        $date = $connection->getRightFormat($connection->sanitize($_POST['SickCallDate']));
    }
    if(isset($_POST['DoctorVisitDate']))
    {
        $medicine = $connection->sanitize($_POST['SickCallMedicine']);
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

    if(isset($_POST['SickCallDiagnosis']))
    {
        $diagnosis = $connection->sanitize($_POST['SickCallDiagnosis']);
    }

    if(isset($_POST['DoctorVisitDate']))
    {
        $visDate = $connection->getRightFormat($connection->sanitize($_POST['DoctorVisitDate']));
    }
	if(isset($_POST['fkSOAPNoteID']))
    {
        $soap = $connection->sanitize($_POST['fkSOAPNoteID']);
    }

	
	$sql = "INSERT INTO tblMedSickCalls (fkClassDetailID , SickCallType, SickCallDate, DoctorVisitDate, SickCallDiagnosis, SickCallMedicine, SickCallReason, SickCallHeight,
											   SickCallWeight, Temperature, BP, Pulse, Respirations)
			VALUES ($classDetailID, '$type', '$date', '$visDate', '$diagnosis', '$medicine', '$reason', $height, $weight, '$temp', '$bp', '$pulse', '$resp')";

    $data = $connection->runQuery($sql);
    $status ="ok";
    $errorMsg="";
}
$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>