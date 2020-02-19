
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID= $_POST['fkClassDetailID'];
$AllergyType    = $_POST['AllergyType'];
$AllergyNote    = $_POST['AllergyNote'];

$sql = "INSERT INTO tblMedAllergies(fkClassDetailID, AllergyType, AllergyNote) VALUES
                VALUES       (\"$fkClassDetailID\", \"$AllergyType\", \"$AllergyNote\")";


$result = $conn->createRecord($sql);

?>


