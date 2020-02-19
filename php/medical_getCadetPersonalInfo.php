<?php
session_start();
require_once 'dbcontroller.php';
$connection = new DBController();


$data = array();
$status = "error";
$errorMsg = "Error retrieving information from server";

$_SESSION['ClassDetailID'] = 10;

if (!isset($_SESSION['loggedIn'])) {
    $status = "error";
    $errorMsg = "illegal access! You must login!";
} else if (!isset($_SESSION['ClassDetailID'])) {
    $status = "error";
    $errorMsg = "You must select a cadet first!";
} else {
	$classDetailID = $_SESSION['ClassDetailID'];
	$sql = "SELECT class.ClassDetailID, ppl.PersonFN, ppl.PersonMN, ppl.pplPersonLN, ppl.PDOB
			FROM tblClassDetails class
			JOIN tblCadets cadet
				ON class.fkCadetID = cadet.CadetID
			JOIN tblPeople ppl
				ON cadet.fkPersonID = ppl.PersonID
			WHERE class.ClassDetailID = $classDetailID";
	
    $data = $connection->runSelectQueryArrayNotEncoded($sql);
    $status = "ok";
    $errorMsg = "";
}
$output = array();
$output['value'] = $data;
$output['status'] = $status;
$output['errorMsg'] = $errorMsg;
echo json_encode($output);
?>