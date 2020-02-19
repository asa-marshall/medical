<?php

/*
 * search-committe_getApplicantFormss.php
 */

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();

$data = array();


$sql = "SELECT FormID, FormName, FormText
                 FROM tblApplicantForms";

if(isset($_POST['FormID'])) {
    $FormID= $_POST['FormID'];
    $sql = "$sql AND FormID = '$FormID'";
}

$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
$output = array();
echo json_encode($data);
?>
