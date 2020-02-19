<?php

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();

$sql = "SELECT *
        FROM tlkpApplicantStatus
        ";

$data = $conn->runSelectQueryArray($sql);

echo json_encode($data);

?>
