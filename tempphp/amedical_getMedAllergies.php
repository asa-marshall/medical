
<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$fkClassDetailID = $_POST['fkClassDetailID'];


$sql = "SELECT *
        FROM   tblMedAllergies
        WHERE tblMedAllergies.fkClassDetailID =  \"$fkClassDetailID\"";

$data = $connection->runSelectQueryArray($sql);

echo json_encode($data);
?>
