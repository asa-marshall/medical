<?php


require_once './dbcontroller.php';

//Create connection
$conn = new DBController();


$sql = "SELECT a.ApplicantID, a.fkPersonID,a.ApplicantStatus,
               p.PSalutation, p.PersonFN, p.PersonLN, p.PersonMN, p.PersonGenQual, p.PCity, p.PCounty, p.PDOB
        FROM tblApplicants a, tblAppPeople p 
        WHERE p.PersonID = a.fkPersonID";

if(isset($_POST['ApplicantStatus'])) {
    $ApplicantStatus= $_POST['ApplicantStatus'];

    $sql = "$sql AND ApplicantStatus = '$ApplicantStatus'";
}
if(isset($_POST['PCounty'])) {
    $PCounty= $_POST['PCounty'];

    if($PCounty!="") {
        $sql = "$sql AND p.PCounty LIKE '%$PCounty%'";
    }
}
if(isset($_POST['PCity'])) {
    $PCity= $_POST['PCity'];

    if($PCity!="") {
        $sql = "$sql AND p.PCity LIKE '%$PCity%'";
    }
}
if(isset($_POST['PersonFN'])) {
    $PersonFN= $_POST['PersonFN'];

    if($PersonFN!="") {
        $sql = "$sql AND p.PersonFN LIKE '%$PersonFN%'";
    }
}
if(isset($_POST['PersonLN'])) {
    $PersonLN= $_POST['PersonLN'];

    if($PersonLN!="") {
        $sql = "$sql AND p.PersonLN LIKE '%$PersonLN%'";
    }
}

//echo $sql;
$data = array();
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each applicant -- remove null values
    while ($row = $result->fetch_assoc()) {
        if($row['PSalutation']==null) {
            $row['PSalutation']="";
        }
        if($row['PersonGenQual']==null) {
            $row['PersonGenQual']="";
        }
        if($row['PCounty']==null) {
            $row['PCounty']="";
        }
        if($row['PCity']==null) {
            $row['PCity']="";
        }
        $row['PSalutation']= trim($row['PSalutation']);
        $row['PersonGenQual']= trim($row['PersonGenQual']);
        $row['PCity']= trim($row['PCity']);
        $row['PCounty']= trim($row['PCounty']);
        $data[] = $row;
    }
}

echo json_encode($data);
?>
