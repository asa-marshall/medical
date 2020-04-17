<?php
require_once './dbcontroller.php';
$conn = new DBController();


if(!empty($_FILES)){
    $path = './upload/' . $_FILES['file']['name'];
    $FilePath = $_FILES['file']['name'];
    $fkFormID = $_POST['fkFormID'];
    echo($fkFormID);
    $SourceFileName =  $_FILES['file']['name'];
    $Note = $_POST['Note'];
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path)){
        $sql="INSERT INTO tblFormAttachments(fkFormID, SourceFileName, Note, FilePath) VALUES ('$fkFormID' ,'$SourceFileName', '$Note','/upload/$FilePath')";
        $result = $conn->runSelectQuery($sql);
        $data = array();
       
        if ($result->num_rows > 0) {

            while ($row = $result->fetch_assoc()) {

                $data[] = $row;

            }
        }

    }
}

?>