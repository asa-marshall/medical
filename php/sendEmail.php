<?php
require_once './dbcontroller.php';
$conn = new DBController();

$FormID= $_POST['FormID'];



$sql="SELECT FilePath FROM tblFormAttachments WHERE fkFormID='$FormID'";

$result = $conn->runSelectQuery($sql);

$data = array();

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $data[] = $row;
    }
}

echo json_encode($data);

?>