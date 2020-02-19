<?php
// File: files_listAll.php
// echos a JSON  array with all logo images
//
require_once 'dbcontroller.php';
$conn = new DBController();

$directory= "datas";

$sql= "SELECT * FROM tlkpApplicationFiles";
$result = $conn->runSelectQuery($sql);
echo '{ "data":[';
//print_r($result);
if ($result->num_rows > 0)
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {

        //display comma
        if ($count >0 )
            echo ",";

        echo '{"FileName": "' . $row["Description"].'",';
        echo '"isRequired": "' . $row["isRequired"].'",';
        echo '"Note": "' . $row["Notes"].'"}';
        $count=$count+1;
    }
    echo '] }';
}
