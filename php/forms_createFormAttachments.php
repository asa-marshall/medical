<?php
require_once './dbcontroller.php';
$conn = new DBController();

$fkFormID = $_POST['fkFormID'];
$SourceFileName = $_POST['SourceFileName'];
$Note = $_POST['Note'];
$FilePath = $_POST['FilePath'];

echo($fkFormID);

$sql="INSERT INTO tblFormAttachments(fkFormID, SourceFileName, Note, FilePath) VALUES ('$fkFormID' ,'$SourceFileName', '$Note', '$FilePath')";

$result = $conn->runSelectQuery($sql);
$data = array();

   if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }
    }

echo json_encode($data);
?>