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

    $sql = "SELECT Date,Type,Notes FROM tblAppointments WHERE fkClassDetailID=\"$classID\"";

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
