<?php
// File: med_FileList.php
// echos a JSON  array with all  images
//
require_once 'dbcontroller.php';
$conn = new DBController();

$directory= "waiverFiles";
$fkClassDetailID="1";

$fileType=NULL;
if(isset($_POST['directory'])){
    $directory = filter_input(INPUT_POST, 'directory');
}
if(isset($_GET['directory'])){
    $directory =  basename(filter_input(INPUT_GET, "directory"));
}
if(isset($_POST['ClassDetailID'])){
    $ApplicantID=filter_input(INPUT_POST,"ClassDetailID");
}
if(isset($_GET['selectFileType'])){
    $fileType=filter_input(INPUT_GET,"selectFileType");
}
$MedFileAttachementID=$_POST['MedFileAttachmentID'];

$sql = "SELECT * FROM tblMedFileAttachments WHERE MedFileAttachmentID= '$MedFileAttachementID'";
$result = $conn->runSelectQuery($sql);
echo '{ "data":[';
if ($result->num_rows > 0)
{
    $count=0;

    // output data on each row
    while($row = $result->fetch_assoc()) {

        //display comma
        if ($count >0 )
            echo ",";

        echo '{"File": "' . $row["docType"].'",';
        $count=$count+1;
        echo '"Path": "' . $row["filePath"].'"}';
    }
}
echo '] }';