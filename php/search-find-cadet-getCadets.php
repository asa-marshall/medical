<?php

/* search-find-cadet_getCadets.php
Uses the conn->sanitize method to escape apostrophes'
using filter_input(INPUT_POST, $_POST['PersonFN'])did NOT work
  when searching for  student Qu'aun Blash
 */

require_once './dbcontroller.php';


$conn = new DBController();
//TODO  used users's SITEID ias teh session siteID
//When the user logs in the SiteID will be stored as a session variable
$SiteID = "1"; //defaulting SiteID to 1 for testing


if(isset($_SESSION['SESSION_SiteID'])) {
    $SiteID= $_SESSION['SESSION_SiteID'];
}
if(isset($_POST['SiteID'])){
    $SiteID = $_POST['SiteID'];
}


$sql = "SELECT tblClassDetails.ClassDetailID, tblClassDetails.AcademyID, tblClassDetails.fkClassID,
               tblClassDetails.fkCadetID, tblClassDetails.CadetStatus, tblClassDetails.CadetImage,
               tblCadets.CadetID, tblCadets.fkPersonID,
               tblPeople.PersonFN, tblPeople.PersonLN, tblPeople.PersonMN, tblPeople.PersonGenQual,
               tblPeople.PDOB, tblPeople.PGender 
        FROM tblClassDetails , tblPeople , tblCadets, tblClasses  
        WHERE 
              tblPeople.PersonID =tblCadets.fkPersonID AND 
              tblCadets.CadetID=tblClassDetails.fkCadetID AND
              tblClasses.ClassID = tblClassDetails.fkClassID AND
              tblClasses.fkSiteID = '$SiteID' ";


if(isset($_POST['AcademyID'])) {
    $AcademyID= $conn->sanitize($_POST['AcademyID']);
    $sql = "$sql AND tblClassDetails.AcademyID = '$AcademyID'";

}
if(isset($_POST['PersonFN'])) {
    $PersonFN = $_POST['PersonFN'];
    $PersonFN = $conn->sanitize($PersonFN);
    $sql = "$sql AND tblPeople.PersonFN LIKE '%$PersonFN%'";
}
if(isset($_POST['PersonLN'])) {
    $PersonLN= $conn->sanitize($_POST['PersonLN']);
    $sql = "$sql AND tblPeople.PersonLN LIKE '%$PersonLN%'";
}
if(isset($_POST['ClassID'])) {
    $ClassID= $conn->sanitize($_POST['ClassID']);
    $sql = "$sql AND tblClassDetails.fkClassID = '$ClassID'";
}

if(isset($_POST['TeacherID'])) {
    $TeacherID= $conn->sanitize($_POST['TeacherID']);
    $sql = "$sql AND tblClassDetails.TeacherID = '$TeacherID'";
}
if(isset($_POST['CounselorID'])) {
    $CounselorID= $conn->sanitize($_POST['CounselorID']);
    $sql = "$sql AND tblClassDetails.CounselorID = '$CounselorID'";
}
if(isset($_POST['CaseManagerID'])) {
    $CaseManagerID= $conn->sanitize($_POST['CaseManagerID']);
    $sql = "$sql AND tblClassDetails.CaseManagerID = '$CaseManagerID'";
}

if(isset($_POST['Platoon'])) {
    $Platoon= $conn->sanitize($_POST['Platoon']);
    $sql = "$sql AND tblClassDetails.Platoon = '$Platoon'";
}
if(isset($_POST['Company'])) {
    $Company= $conn->sanitize($_POST['Company']);
    $sql = "$sql AND tblClassDetails.Company = '$Company'";
}
if(isset($_POST['Sqaud'])) {
    $Squad= $conn->sanitize($_POST['Squad']);
    $sql = "$sql AND tblClassDetails.Squad = '$Squad'";
}

if(isset($_POST['CadetStatus'])) {
    $CadetStatus= $conn->sanitize($_POST['CadetStatus']);
    $sql = "$sql AND tblClassDetails.CadetStatus = '$CadetStatus'";
}

$data = array();

$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each cadet -- remove null values
    while ($row = $result->fetch_assoc()) {
        foreach ($row as $key=>$value) {
            if ($value == null) {
                $row[$key] = "";
            }
        }

        $data[] = $row;
    }
}

echo json_encode($data);

?>
