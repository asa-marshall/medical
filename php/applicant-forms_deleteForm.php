<?php

session_start();

require_once 'dbcontroller.php';
$conn = new DBController();

$FormID = $_POST['FormID'];

$sql = "DELETE FROM tblApplicantForms WHERE FormID = \"$FormID\"";

$result = $conn->runDeleteQuery($sql);

echo json_encode($result);
?>

