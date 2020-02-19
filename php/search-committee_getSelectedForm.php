<?php

/*
 * search-committe_getEmails.php
 * Returns te Applicant's Name & Emails,
 * also provides the Guardian's name and email if the Guardian has provided an email.
 * If an applicant status is provided, restrict values returned.
 */

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();


$FormID = '2';

if(isset($_POST['FormID'])) {
    $FormID= $_POST['FormID'];

}
$sql = "SELECT FormID, FormName, FormText
        FROM tblApplicantForms
        WHERE FormID = '$FormID'";


$data = array();
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each applicant
    while ($row = $result->fetch_assoc()) {

        $data[] = $row;

    }
}
$output = array();
echo json_encode($data);

?>
