
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$FormName    = $_POST['FormName'];
$FormText    = $_POST['FormText'];

$sql = "INSERT INTO tblApplicantForms(FormName, FormText) VALUES
                VALUES       (\"$FormName\", \"$FormText\")";


$result = $conn->createRecord($sql);

?>


