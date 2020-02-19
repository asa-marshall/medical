
<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$sql = "SELECT *
        FROM   tblApplicantForms
        ";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);
?>
