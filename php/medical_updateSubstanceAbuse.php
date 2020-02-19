<?php
require_once 'dbcontroller.php';

session_start();

$conn = new DBController();
$result = false;

if( isset($_POST['MedSubstAbuseID']) &&
    isset($_POST['SubstAbuseTestDate']) &&
    isset($_POST['WasPositive']) &&
    isset($_POST['SubstAbuseTestNotes']) &&
    isset($_POST['DrugsAbused'])) {
    $MedSubstAbuseID = $_POST['MedSubstAbuseID'];
    $SubstAbuseTestDate = $_POST['SubstAbuseTestDate'];
    $WasPositive = $_POST['WasPositive'];
    $SubstAbuseTestNotes = $conn->sanitize($_POST['SubstAbuseTestNotes']);
    $DrugsAbused = $conn->sanitize($_POST['DrugsAbused']);

    $sql = "UPDATE tblMedSubstAbuse SET 
               SubstAbuseTestDate = \"$SubstAbuseTestDate\",
               WasPositive = \"$WasPositive\", 
               DrugsAbused = \"$DrugsAbused\",
               SubstAbuseTestNotes = '$SubstAbuseTestNotes' 
        WHERE MedSubstAbuseID = \"$MedSubstAbuseID\"";

    $result = $conn->runQuery($sql);
}
echo json_encode($result);

?>