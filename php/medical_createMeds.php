
<?php

require_once 'dbcontroller.php';

session_start();


$conn = new DBController();

$fkClassDetailID=  $conn->sanitize($_POST['fkClassDetailID']);
$fkMedType    =  $conn->sanitize($_POST['fkMedType']);
$MedName      =  $conn->sanitize($_POST['MedName']);
$Dose         =  $conn->sanitize($_POST['Dose']);
$Frequency    =  $conn->sanitize($_POST['Frequency']);
$TakenWhen    =  $conn->sanitize($_POST['TakenWhen']);
$MedStartDate =  $conn->sanitize($_POST['MedStartDate']);
$MedEndDate   =  $conn->sanitize($_POST['MedEndDate']);
$MedNote      =  $conn->sanitize($_POST['MedNote']);

$sql = "INSERT INTO tblMeds VALUES
 (  fkClassDetailID, fkMedType, MedName, Dose, Frequency, TakenWhen, MedStartDate, MedEndDate, MedNote) VALUES 
 ( '$fkClassDetailID', '$fkMedType', '$MedName', '$Dose', '$Frequency', '$TakenWhen', '$MedStartDate', '$MedEndDate', '$MedNote')";

$result = $conn->createRecord($sql);

?>


