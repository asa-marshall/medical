<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID    = $_POST['fkClassDetailID'];
$ImmunizationType =  $conn->sanitize($_POST['ImmunizationType']);
$ImmunizationDate = $_POST['ImmunizationDate'];
$ImmunizationValidTillDate = $_POST['ImmunizationValidTillDate'];
$ImmunizationNote =  $conn->sanitize($_POST['ImmunizationNote']);

$sql = "INSERT INTO tblMedImmunizations (fkClassDetailID, ImmunizationType, ImmunizationDate, ImmunizationValidTillDate, ImmunizationNote) 
VALUES (\"$fkClassDetailID\", \"$ImmunizationType\", \"$ImmunizationDate\", \"$ImmunizationValidTillDate\", \"$ImmunizationNote\")";

$conn->createRecord($sql);

?>
