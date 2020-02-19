
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID    = $_POST['fkClassDetailID'];
$SubstAbuseTestDate    = $_POST['SubstAbuseTestDate'];
$WasPositive = $_POST['WasPositive'];
$SubstAbuseTestNotes =  $conn->sanitize($_POST['SubstAbuseTestNotes']);
$DrugsAbused =  $conn->sanitize($_POST['DrugsAbused']);


$sql = "INSERT INTO tblMedSubstAbuse (fkClassDetailID, SubstAbuseTestDate, WasPositive, SubstAbuseTestNotes, DrugsAbused) 
                VALUES       (\"$fkClassDetailID\", \"$SubstAbuseTestDate\", \"$WasPositive\", \"$SubstAbuseTestNotes\", \"$DrugsAbused\")";

$conn->createRecord($sql);

?>


