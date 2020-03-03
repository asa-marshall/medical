<?php
require_once './dbcontroller.php';
$conn = new DBController();


$fkFormID = $_POST['fkFormID'];



$sql="SELECT * FROM tblFormAttachments WHERE fkFormID = '$fkFormID'" ;

$result = $conn->runSelectQuery($sql);
$data = array();

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $data[] = $row;
    }
}

echo json_encode($data);
?>