<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$MedImmunizationID = $_POST['MedImmunizationID'];

$sql = "DELETE FROM tblMedImmunizations WHERE MedImmunizationID = '$MedImmunizationID'";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

