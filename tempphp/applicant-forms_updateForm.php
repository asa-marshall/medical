<?php
require_once 'dbcontroller.php';

session_start();

$conn = new DBController();

$FormID    = $_POST['FormID'];
$FormName    = $_POST['FormName'];
$FormText   = $_POST['FormText'];



$sql = "UPDATE tblApplicantForms SET 
               FormName=\"$FormName\",
               FormText=\"$FormText\" 
               WHERE FormID =\"$FormID\"";

$result = $conn->runQuery($sql);


echo json_encode($result);

?>