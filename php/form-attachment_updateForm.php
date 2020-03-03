<?php
require_once './dbcontroller.php';
$conn = new DBController();

$FormAttachmentID= $_POST['FormAttachmentID'];
$fkFormID = $_POST['fkFormID'];
$SourceFileName = $_POST['SourceFileName'];
$Note = $_POST['Note'];
$FilePath = $_POST['FilePath'];

$sql="UPDATE tblFormAttachments
     SET  SourceFileName='$SourceFileName', Note= '$Note', FilePath = '$FilePath' 
     WHERE FormAttachmentID='$FormAttachmentID'";

$result = $conn->runSelectQuery($sql);
$data = array();

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $data[] = $row;
    }
}

echo json_encode($data);
?>