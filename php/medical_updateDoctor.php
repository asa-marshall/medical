<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";

$_SESSION['ClassDetailID'] = 5000;

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['ClassDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else if(isset($_POST['DoctorType']) && isset($_POST['DoctorName']) && isset($_POST['PracticeName']) && isset($_POST['PracticeContactPhone'])){
	$classDetailID = $_SESSION['ClassDetailID'];
	$id = $_POST['DoctorID'];
	
	$type = $connection->sanitize($_POST['DoctorType']);
	$dname = $connection->sanitize($_POST['DoctorName']);
    $pname = $connection->sanitize($_POST['PracticeName']);
    $paddr = '';

    $demail = $connection->sanitize($_POST['DoctorEmail']);
	$phone = $connection->sanitize($_POST['PracticeContactPhone']);
	$pfax = '';

	if(isset($_POST['PracticeAddress']))
	{
		$paddr = $connection->sanitize($_POST['PracticeAddress']);
	}
	if(isset($_POST['PracticeContactFax']))
	{
		$pfax = $connection->sanitize($_POST['PracticeContactFax']);
	}
			
	$sql = "UPDATE tblPrimaryDoctors
			SET	DoctorType = '$type', DoctorName = '$dname', DoctorEmail = '$demail', PracticeName = '$pname', 
			    PracticeAddress = '$paddr', PracticeContactPhone = '$phone', PracticeContactFax = '$pfax'
			WHERE DoctorID = $id
			AND fkClassDetailID = $classDetailID";
	
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