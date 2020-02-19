<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$MedInsuranceID = $_POST['MedInsuranceID'];

$sql = "DELETE FROM tblMedInsurance WHERE MedInsuranceID = \"$MedInsuranceID\"";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

