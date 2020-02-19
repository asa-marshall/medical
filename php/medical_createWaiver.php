<?php
/*
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$sql = "";
$data = array();
$keys = array();
$values = array();
$status="error";
$errorMsg="Error inserting record";

if(isset($_SESSION['thisDetailID'])){
    $classID = $_SESSION['thisDetailID'];
}
if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
}
else {

    $permissions = $_SESSION["Permissions"];
    if ($permissions["Website"] < 2) {
        $status = "error";
        $errorMsg = "You do not have Website EDIT permissions";
        $output = array();
        $output['status'] = $status;
        $output['errorMsg']= $errorMsg;
    }
    else {
        //MARK: Consider there may be fields in table that are not sent as POST
        //MARK Get all Fields from table and only add the fields that were sent via POST
        //$cdid=$_SESSION['ClassDetailID'];
        $wd=$_POST['wavDate'];
        $type=$_POST['wavType'];
        $notes=$_POST['wavNote'];
        $url=$_POST['wavFile'];

        $sql =  "INSERT INTO tblMedWaiversInfo (fkClassDetailID, WaiverDate, Type, Notes) VALUES ($classID, $wd, $type, $notes)";
            
        $output = $connection->runSelectQuery($sql);
    }

    echo json_encode($output);

    $url = $_POST['wavFile'];

    $newSql = "INSERT INTO tblMedWaivers (WaiverDate, fkClassDetailID, URL) VALUES ($wd, $classID, $url)";

    $output = $connection->runSelectQuery($sql);
    $output = array();
    $output['data'] = $data;
    $output['status']=$status;
    $output['errorMsg']=$errorMsg;
    echo json_encode($output);
}
?>


<?php*/
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
    /*$newSql = "INSERT INTO tblMedWaivers (WaiverDate, fkClassDetailID, URL) VALUES ($wd, $classID, $url)";

    $result = $connection->runSelectQuery($newSql);
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
        }
    }*/
}

$output = array();
$output['data'] = $data;
$output['status']=$status;
$output['errorMsg']=$errorMsg;
echo json_encode($output);

?>

