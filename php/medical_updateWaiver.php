<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$data = array();
$status = "error";
$errorMsg = "richardError retrieving information from server";




if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
}
else if  (!isset($_POST['MedWaiverID'])) {
    $status = "error";
    $errorMsg = "Missing privilegeID parameter";
}
else {
    $permissions = $_SESSION["Permissions"];
    if ($permissions["Website"] < 2) {
        $status = "error";
        $errorMsg = "You do not have Website update permissions";
    } else {

        $date=$_POST['WaiverDate'];
        $type=$_POST['Type'];
        $notes=$_POST['Notes'];
        $id=$_POST['MedWaiverID'];

        $updateString= "UPDATE tblMedWaiversInfo SET WaiverDate=\"$date\", Type=\"$type\", Notes=\"$notes\", WHERE MedWaiverID=\"$id\"";


        $result = $connection->runSelectQuery($updateString);

        if ($result)
        {
            $status = "ok";
            $errorMsg ="";
        }
        else {

            $status = "error";
            $errorMsg = $result['statusText'];
        }

    }
}
$output = array();
$output["status"] = $status;
$output["errorMsg"] = $errorMsg;
$output["data"] = $data;
echo json_encode($output);
?>
