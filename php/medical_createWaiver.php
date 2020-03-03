<?php

require_once 'dbcontroller.php';

session_start();

if(isset($_SESSION['thisDetailID'])){
    $classID = $_SESSION['thisDetailID'];
}



$conn = new DBController();

$data = array();
$status="error";
$errorMsg="Error getting allergies";


if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
}

else {

    $username = $_SESSION["minerva_user"];
    $status ="ok";
    $errorMsg="";
    $wd=$_POST['wavDate'];
    $type=$_POST['wavType'];
    $notes=$_POST['wavNote'];
    $url=$_POST['wavFile'];
    //date('Y-m-d\TH:i:sP',SubstAbuseTestDate)
    $sql =  "INSERT INTO tblMedWaiversInfo (fkClassDetailID, WaiverDate, Type, Notes) VALUES (\"$classID\", \"$wd\", \"$type\", \"$notes\")";

    $result = $conn->runSelectQuery($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }
    }

}

$output = array();
$output['data'] = $data;
$output['status']=$status;
$output['errorMsg']=$errorMsg;
echo json_encode($output);

?>

