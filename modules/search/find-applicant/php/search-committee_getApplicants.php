<?php

/*
 * search-committe_getApplicants.php
 * If an applicant status is provided, restrict values returned.
 * 0
 * 1
 * 2
 * 3
 */

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();

$data = array();


$sql = "SELECT PersonFN, PersonLN, PrevSchool,ReferralSource,StudentClassification,AcademicCredits,
                 Withdrawl,HighestEducation,LegalStatus,Status, ApplicantStatus
                 FROM tblApplicants a, tblAppPeople b 
                 WHERE b.PersonID = a.fkPersonID";

if(isset($_POST['ApplicantStatus'])) {
    $ApplicantStatus= $_POST['ApplicantStatus'];

    if($ApplicantStatus >= 0) {
        $sql = "$sql AND ApplicantStatus = '$ApplicantStatus'";
    }
}
//echo $sql;
//print_r($_POST);
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
$output = array();
echo json_encode($data);

?>
