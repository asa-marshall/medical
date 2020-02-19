<?php
require_once './dbcontroller.php';

//Create connection
$conn = new DBController();
session_start();

$data = array();
$status="error";
$errorMsg="Error getting personal information";
if(isset($_SESSION['thisDetailID'])){
    $classID = $_SESSION['thisDetailID'];
}


if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
}
else {

    //TODO: Get seession's user name and Site Information
    $username = $_SESSION["minerva_user"];
    $siteID = $_SESSION["SiteID"];
    $status ="ok";
    $errorMsg="";

    $sql =     "SELECT SiteName  FROM tlkpSite  WHERE SiteID= '$siteID'";
    $result = $conn->runSelectQuery($sql);
    $row = $result->fetch_assoc();
    $siteName = $row['SiteName'];

    $date = $_POST['date'];
    $type = $_POST['type'];
    $notes = $_POST['note'];

    $sql ="INSERT INTO `tblAppointments`(`fkClassDetailID`, `Date`, `Type`, `Notes`) VALUES ('$classID','$date','$type','$notes')";

//PersonID used is 38 MS. Keith Alan Coop
    $result = $conn->runQuery($sql);
    if ($result) {
        $status = "ok";
        $errorMsg="";
    }
    else {
        $status = "error";
        $errorMsg = "fatal error updating";
    }
}

$output = array();
$output['status']=$status;
$output['errorMsg']=$errorMsg;
header('Location: ../index.html');
echo json_encode($output);

?>
