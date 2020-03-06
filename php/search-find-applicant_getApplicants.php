<?php
//Using filter_input(INPUT_POST, ..) filters '
require_once './dbcontroller.php';

//Create connection
$conn = new DBController();


$sql = "SELECT a.ApplicantID, a.fkPersonID,a.ApplicantStatus,
               p.PSalutation, p.PersonFN, p.PersonLN, p.PersonMN, p.PersonGenQual, p.PCity, p.PCounty, p.PDOB
        FROM tblApplicants a, tblAppPeople p
        WHERE p.PersonID = a.fkPersonID";

if(isset($_POST['ApplicantStatus'])) {
    $ApplicantStatus=  $conn->sanitize($_POST['ApplicantStatus']);

    $sql = "$sql AND ApplicantStatus = '$ApplicantStatus'";
}
if(isset($_POST['PCounty'])) {
    $PCounty=  $conn->sanitize($_POST['PCounty']);

    if($PCounty!="") {
        $sql = "$sql AND p.PCounty LIKE '%$PCounty%'";
    }
}
if(isset($_POST['PCity'])) {
    $PCity=  $conn->sanitize($_POST['PCity']);

    if($PCity!="") {
        $sql = "$sql AND p.PCity LIKE '%$PCity%'";
    }
}
if(isset($_POST['PersonFN'])) {
    $PersonFN=  $conn->sanitize($_POST['PersonFN']);

    if($PersonFN!="") {
        $sql = "$sql AND p.PersonFN LIKE '%$PersonFN%'";
    }
}
if(isset($_POST['PersonLN'])) {
    $PersonLN=  $conn->sanitize($_POST['PersonLN']);

    if($PersonLN!="") {
        $sql = "$sql AND p.PersonLN LIKE '%$PersonLN%'";
    }
}

/*if(isset($_POST['PRegion'])) {
    $PRegion=  $conn->sanitize($_POST['PersonLN']);

    if($PersonLN!="") {
        $sql = "$sql AND p.PCounty LIKE c.CountyName AND c.RegionID = r.AutoID";
    }
}*/



//SELECT RegionID FROM tblAppPeople, tlkpRecruitCounty WHERE tblAppPeople.PCounty = tlkpRecruitCounty.CountyName
//Query for calculating regionID from county

$data = array();

//note using runSelectQueryArray - resulted in apostrophes not displaying correctly
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each applicant -- remove null values
    while ($row = $result->fetch_assoc()) {
        $ApplicantID = $row['ApplicantID'];
        $fkPersonID = $row['fkPersonID'];
        $county = $row['PCounty'];
        foreach ($row as $key=>$value) {
            if ($value == null) {
                $row[$key] = "";
            }
        }

        //find region based on county
        $RegionID = 0;
        $regionSQL = "SELECT c.RegionID FROM tlkpRecruitCounty c WHERE '$county' = c.CountyName";
        $regionResult = $conn->runSelectQuery($regionSQL);

        if(!empty($result) && $regionResult->num_rows>0) {
            while($row2 = $regionResult->fetch_assoc()) {
                $RegionID = $row2['RegionID'];
            }
        }

        $row['PRegion'] = $RegionID;

        $data[] = $row;
    }
}

echo json_encode($data);
?>
