
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();


$FormName    =  $conn->sanitize($_POST['FormName']);
$FormText    =  $conn->sanitize($_POST['FormText']);

$sql = "INSERT INTO tblApplicantForms(FormName, FormText) 
                VALUES       (\"$FormName\", \"$FormText\")";

$result = $conn->createRecord($sql);

?>


