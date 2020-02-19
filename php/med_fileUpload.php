<?php
//med_fileUpload.php
//Remember to change the permissions on the directory chmod 777 to allow read and write
//----------------------------------------------
//Connect to Database
require_once 'dbcontroller.php';
$conn = new DBController();


$directory = "waiverFiles";
$fkClassDetailID="1";
if (isset($_POST['directory'])) {
    $directory = filter_input(INPUT_POST, 'directory');
}

if (isset($_POST['ClassDetailID'])) {
    $fkClassDetailID = $_POST['ClassDetailID'];
}

if (isset($_POST['fileType'])) {
    $fileType = $_POST['fileType'];  //Medical Waiver
}

$fileName = $_FILES['file']['name']; //original name of file
$fileSize = $_FILES['file']['size'];
$pathTmpName = $_FILES['file']['tmp_name']; //a unique temporary file name is created


$fileExtension = strtolower(end(explode('.', $_FILES['file']['name'])));

//Extract the temporary filename from the complete path
$fileTmpName = strtolower(end(explode('/', $pathTmpName)));

//Create a unique name using the auto-generated filename, ClassDetailID and file name
$aPath = "$directory/$fileTmpName" . "_" . "$fkClassDetailID$fileName";

move_uploaded_file($pathTmpName, "../$aPath");


$currentDate = date("Y-m-d");

//SQL for inserting new file into the database.
$sql = "INSERT INTO `tblMedFileAttachments` (`DateUploaded`, `fkClassDetail`, `DocType`, `Note`, `FilePath`) VALUES 
                    ('$currentDate', '$fkClassDetailID', '$fileType', '$fileName', '$aPath');";

$result = $conn->runQuery($sql);
echo $result;

?>