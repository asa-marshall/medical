<?php
require_once 'dbcontroller.php';

session_start();

$conn = new DBController();


$ImmunizationType =  $conn->sanitize($_POST['ImmunizationType']);
$ImmunizationDate =  $conn->sanitize($_POST['ImmunizationDate']);
$ImmunizationValidTillDate =  $conn->sanitize($_POST['ImmunizationValidTillDate']);
$ImmunizationNote =  $conn->sanitize($_POST['ImmunizationNote']);
$MedImmunizationID =  $conn->sanitize($_POST['MedImmunizationID']);

    $sql = "UPDATE tblMedImmunizations 
            SET 
                ImmunizationType = '$ImmunizationType',
                ImmunizationDate = '$ImmunizationDate',
                ImmunizationValidTillDate = '$ImmunizationValidTillDate', 
                ImmunizationNote = '$ImmunizationNote'
            WHERE MedImmunizationID = '$MedImmunizationID'";

    echo $sql;
    $result = $conn->runQuery($sql);


echo json_encode($result);

?>