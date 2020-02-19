<?php

/*
 * search-committe_getApplicantFormss.php
 */

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();

$data = array();


$sql = "SELECT FormFieldID, TableName, ColumnName, MergeField
                 FROM tlkpFormFields";


$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
$output = array();
echo json_encode($data);
?>
