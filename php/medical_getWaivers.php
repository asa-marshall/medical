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
else{
        $id=-1;
        $date=DateTime::createFromFormat('Y-m-d', "2019-11-12")->format('Y-m-d');

        $getString= "Select URL From tblMedWaivers WHERE WaiverDate ='$date' AND fkClassDetailID='$id'";

        $result = $connection->runSelectQueryArrayNotEncoded($getString);

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
$output = array();
$output["status"] = $status;
$output["errorMsg"] = $errorMsg;
$output["data"] = $result;
echo json_encode($output);
?>
