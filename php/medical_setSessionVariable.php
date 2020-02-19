<?php
require_once 'dbcontroller.php';

session_start();

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

    $cadetID = $_POST['CadetID'];
    //date('Y-m-d\TH:i:sP',SubstAbuseTestDate)
    $sql = "SELECT ClassDetailID FROM tblClassDetails JOIN tblCadets on tblClassDetails.fkCadetID = tblCadets.CadetID WHERE tblClassDetails.fkCadetID = \"$cadetID\"";

    $result = $conn->runSelectQuery($sql);

    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {

            $data[] = $row;
            $_SESSION['thisDetailID'] = $row['ClassDetailID'];
            $testing = $_SESSION['thisDetailID'];
        }
    }
}

$output = array();
$output['data'] = $data;
$output['status']=$status;
$output['errorMsg']=$errorMsg;
echo json_encode($output);

?>
