<?php
require_once './dbcontroller.php';
$conn = new DBController();

$FormAttachmentsID= $_POST['FormAttachmentsID'];


echo($FormAttachmentsID);
$sql="DELETE FROM tblFormAttachments WHERE FormAttachmentsID='$FormAttachmentsID'";

$result = $conn->runSelectQuery($sql);
$data = array();

   if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }
    }

echo json_encode($data);
?>