
<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$fkClassDetailID = $_POST['fkClassDetailID'];


$sql = "SELECT * FROM tblMeds WHERE fkClassDetailID =  \"$fkClassDetailID\"";

$data = $connection->runSelectQueryArrayNotEncoded($sql);

echo json_encode($data);
?>
