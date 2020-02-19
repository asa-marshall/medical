<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$MedAllergyID = $_POST['MedAllergyID'];

$sql = "DELETE FROM tblMedAllergies WHERE MedAllergyID = \"$MedAllergyID\"";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

