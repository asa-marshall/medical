<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();

$data = array();

$InsuranceType        =  $conn->sanitize($_POST['InsuranceType']);
$PolicyNumber         =  $conn->sanitize($_POST['PolicyNumber']);
$PolicyHolderName     =  $conn->sanitize($_POST['PolicyHolderName']);
$PolicyHolderRelationship        =  $conn->sanitize($_POST['PolicyHolderRelationship']);
$GroupNumber      =  $conn->sanitize($_POST['GroupNumber']);
$PolicyExpDate    = $_POST['PolicyExpDate'];
$PrimaryHCP  =  $conn->sanitize($_POST['PrimaryHCP']);
$CopayInfo   =  $conn->sanitize($_POST['CopayInfo']);
$InsCoName      =  $conn->sanitize($_POST['InsCoName']);
$InsCoAddress       =  $conn->sanitize($_POST['InsCoAddress']);
$InsCoCity    =  $conn->sanitize($_POST['InsCoCity']);
$InsCoState    =  $conn->sanitize($_POST['InsCoState']);
$InsCoZip =  $conn->sanitize($_POST['InsCoZip']);
$InsCoPhone  =  $conn->sanitize($_POST['InsCoPhone']);
$InsCoFax      =  $conn->sanitize($_POST['InsCoFax']);
$MedInsuranceID      =   $conn->sanitize($_POST['MedInsuranceID']);

	$sql = "UPDATE tblMedInsurance
			SET InsuranceType = '$InsuranceType',
			 PolicyNumber = '$PolicyNumber', 
			 PolicyHolderName = '$PolicyHolderName', 
			 PolicyHolderRelationship = '$PolicyHolderRelationship', 
			 GroupNumber = '$GroupNumber',
			 PolicyExpDate = '$PolicyExpDate', 
			 PrimaryHCP = '$PrimaryHCP', 
			 CopayInfo = '$CopayInfo', 
			 InsCoName = '$InsCoName', 
			 InsCoAddress = '$InsCoAddress', 
			 InsCoCity = '$InsCoCity', 
			 InsCoState = '$InsCoState', 
			 InsCoZip = '$InsCoZip', 
			 InsCoPhone = '$InsCoPhone', 
			 InsCoFax = '$InsCoFax'
			WHERE MedInsuranceID = '$MedInsuranceID'";
	
    $data = $connection->runQuery($sql);

echo json_encode($data);
?>