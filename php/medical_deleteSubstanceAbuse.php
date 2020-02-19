<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$MedSubstAbuseID = $_POST['MedSubstAbuseID'];

$sql = "DELETE FROM tblMedImmunizations WHERE MedImmunizationID = '$MedSubstAbuseID'";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

