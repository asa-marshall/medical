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
} else  if (isset($_POST['DoctorType']) && isset($_POST['DoctorName']) && isset($_POST['PracticeName']) && isset($_POST['PracticeContactPhone'])){
	$classDetailID = $_SESSION['thisDetailID'];
	
	$type = '';
	$dname = '';
	$pname = '';
    $paddr = '';

    $demail = '';
	$phone = '';
	$pfax = '';

    if(isset($_POST['DoctorType']))
    {
        $type = $connection->sanitize($_POST['DoctorType']);
    }
    if(isset($_POST['DoctorName']))
    {
        $dname = $connection->sanitize($_POST['DoctorName']);
    }
    if(isset($_POST['PracticeName']))
    {
        $pname = $connection->sanitize($_POST['PracticeName']);
    }
    if(isset($_POST['PracticeAddress']))
    {
        $paddr = $connection->sanitize($_POST['PracticeAddress']);
    }

    if(isset($_POST['DoctorEmail']))
    {
        $demail = $connection->sanitize($_POST['DoctorEmail']);
    }
    if(isset($_POST['PracticeContactPhone']))
    {
        $phone = $connection->sanitize($_POST['PracticeContactPhone']);
    }
	if(isset($_POST['PracticeContactFax']))
	{
		$pfax = $connection->sanitize($_POST['PracticeContactFax']);
	}

	$sql = "INSERT INTO tblPrimaryDoctors (fkClassDetailID, DoctorType, DoctorName, DoctorEmail, PracticeName, 
                                           PracticeAddress, PracticeContactPhone, PracticeContactFax)
			VALUES ('$classDetailID', '$type', '$dname', '$demail', '$pname', '$paddr', '$phone', '$pfax')";
	
    $data = $connection->runQuery($sql);
    $status = "ok";
    $errorMsg = "";
} else {
	$status = "error";
    $errorMsg = "You must enter Doctor Type and Name, Practice Name and Phone!";
}
$output = array();
$output['data'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>