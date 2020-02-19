
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID= $_POST['fkClassDetailID'];
$AllergyType    =  $conn->sanitize($_POST['AllergyType']);
$AllergyNote    =  $conn->sanitize($_POST['AllergyNote']);

$sql = "INSERT INTO tblMedAllergies(fkClassDetailID, AllergyType, AllergyNote) 
        VALUES( \"$fkClassDetailID\", 
                \"$AllergyType\",
                \"$AllergyNote\"
              )";


$result = $conn->createRecord($sql);

?>


