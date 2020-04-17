<?php
require_once './dbcontroller.php';
$conn = new DBController();


if(!empty($_FILES)){
    $path = './upload/' . $_FILES['file']['name'];
    $FilePath = $_FILES['file']['name'];
    $FormAttachmentID = $_POST['FormAttachmentID'];
    $fkFormID = $_POST['fkFormID'];
    $SourceFileName = $_FILES['file']['name'];
    $Note = $_POST['Note'];
    echo($FormAttachmentID);
    if(move_uploaded_file($_FILES['file']['tmp_name'], $path)){
        $sql="UPDATE tblFormAttachments
        SET  SourceFileName='$SourceFileName', Note= '$Note', FilePath = '/upload/$FilePath' 
        WHERE FormAttachmentID='$FormAttachmentID'";
        $result = $conn->runSelectQuery($sql);
        $data = array();

        if ($result->num_rows > 0) {

            while ($row = $result->fetch_assoc()) {

                $data[] = $row;
            }
        }
        echo json_encode($data);
    }    }



?>