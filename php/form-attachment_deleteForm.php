<?php
require_once './dbcontroller.php';
$conn = new DBController();

$FormAttachmentID= $_POST['FormAttachmentID'];
$SourceFileName= $_POST['SourceFileName'];
$a1 = 'upload/';

if(unlink($a1.$SourceFileName)){
    echo 'File Success fully removed';
}else{
    echo 'Something Wrong';
}
echo('fdd');
echo($FormAttachmentID);
$sql="DELETE FROM tblFormAttachments WHERE FormAttachmentID='$FormAttachmentID'";

$result = $conn->runSelectQuery($sql);
$data = array();

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $data[] = $row;
    }
}

echo json_encode($data);
?>