<?php
require_once 'dbcontroller.php';

session_start();

$conn = new DBController();

$MedID        =  $conn->sanitize($_POST['MedID']);
$fkMedType    =  $conn->sanitize($_POST['fkMedType']);
$MedName      =  $conn->sanitize($_POST['MedName']);
$Dose         =  $conn->sanitize($_POST['Dose']);
$Frequency    =  $conn->sanitize($_POST['Frequency']);
$TakenWhen    =  $conn->sanitize($_POST['TakenWhen']);
$MedStartDate =  $conn->sanitize($_POST['MedStartDate']);
$MedEndDate   =  $conn->sanitize($_POST['MedEndDate']);
$MedNote      =  $conn->sanitize($_POST['MedNote']);

$sql = "UPDATE tblMeds SET 
  fkMedType = '$fkMedType',
  MedName = '$MedName',
  Dose = '$Dose',
  Frequency = '$Frequency',
  TakenWhen = '$TakenWhen',
  MedStartDate = '$MedStartDate',
  MedEndDate = '$MedEndDate',
  MedNote = '$MedNote'
  WHERE MedID =\"$MedID\"";

$result = $conn->runQuery($sql);


echo json_encode($result);

?>