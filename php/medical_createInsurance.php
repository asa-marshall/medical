
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID=  $conn->sanitize($_POST['fkClassDetailID']);
$InsuranceType        =  $conn->sanitize($_POST['InsuranceType']);
$PolicyNumber         =  $conn->sanitize($_POST['PolicyNumber']);
$PolicyHolderName     =  $conn->sanitize($_POST['PolicyHolderName']);
$PolicyHolderRelationship        =  $conn->sanitize($_POST['PolicyHolderRelationship']);
$GroupNumber      =  $conn->sanitize($_POST['GroupNumber']);
$PolicyExpDate    =  $conn->sanitize($_POST['PolicyExpDate']);
$PrimaryHCP  =  $conn->sanitize($_POST['PrimaryHCP']);
$CopayInfo   =  $conn->sanitize($_POST['CopayInfo']);
$InsCoName      =  $conn->sanitize($_POST['InsCoName']);
$InsCoAddress       =  $conn->sanitize($_POST['InsCoAddress']);
$InsCoAddress2       =  $conn->sanitize($_POST['InsCoAddress2']);
$InsCoCity    =  $conn->sanitize($_POST['InsCoCity']);
$InsCoState    =  $conn->sanitize($_POST['InsCoState']);
$InsCoZip =  $conn->sanitize($_POST['InsCoZip']);
$InsCoPhone  =  $conn->sanitize($_POST['InsCoPhone']);
$InsCoFax      =  $conn->sanitize($_POST['InsCoFax']);

$sql = "
INSERT INTO tblMedInsurance
( fkClassDetailID, InsuranceType, PolicyNumber, PolicyHolderName, 
 PolicyHolderRelationship, GroupNumber, PolicyExpDate, PrimaryHCP, 
 CopayInfo, InsCoName, InsCoAddress, InsCoAddress2, InsCoCity, InsCoState, InsCoZip, 
 InsCoPhone, InsCoFax) VALUE
 ('$fkClassDetailID', '$InsuranceType', '$PolicyNumber', '$PolicyHolderName', 
 '$PolicyHolderRelationship', '$GroupNumber', '$PolicyExpDate', '$PrimaryHCP', 
 '$CopayInfo', '$InsCoName', '$InsCoAddress', '$InsCoAddress2', '$InsCoCity', '$InsCoState', '$InsCoZip', 
 '$InsCoPhone', '$InsCoFax')
";

$result = $conn->createRecord($sql);

?>


