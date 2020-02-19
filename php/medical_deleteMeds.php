<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$MedID = $_POST['MedID'];

$sql = "DELETE FROM tblMeds WHERE MedID = \"$MedID\"";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

