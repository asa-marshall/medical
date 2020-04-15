    <?php
require_once './dbcontroller.php';
$conn = new DBController();


$PersonID    = $_POST['PersonID'];




$sql = "SELECT tlkpApplicationFiles.AutoID, tlkpApplicationFiles.Description FROM `tlkpApplicationFiles` WHERE AutoID NOT IN 
            (SELECT fkApplicationFileID FROM `tblAppDocs` WHERE fkApplicantID = 
            (SELECT ApplicantID FROM `tblApplicants` WHERE tblApplicants.ApplicantID = $PersonID))";
               
$result = $conn->runSelectQuery($sql);
$data = array();

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {

        $data[] = $row;
    }
}

echo json_encode($data);

?>