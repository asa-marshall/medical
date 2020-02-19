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

$selectedIDs=$_POST['selectedIDs'];
$columnNames=$_POST['columnNames'];

// get structure of tblAppPeople and and confirm the column names

$sql = "SELECT a.ApplicantID, a.fkPersonID, $columnNames
        FROM tblApplicants a, tblAppPeople p 
        WHERE p.PersonID = a.fkPersonID AND a.ApplicantID in ($selectedIDs)";



$data = array();
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each applicant
    while ($row = $result->fetch_assoc()) {

        foreach ($row as $key=>$value) {
            if ($value == null){
                $row[$key]="";
            }
        }
        $ApplicantID = $row['ApplicantID'];
        $fkPersonID = $row['fkPersonID'];


        //Find all emails for an applicant
        $email = array();
        $sql2 ="SELECT ContactInfo, IsPreferred
                    FROM tblAppContacts
                    WHERE fkPersonID = '$fkPersonID'";

        $result2 = $conn->runSelectQuery($sql2);
        if ($result2->num_rows > 0) {
            while ($row2 = $result2->fetch_assoc()) {
                //Add email to list only if ContactInfo contains @
                $ContactInfo = $row2['ContactInfo'];
                if(strpos($ContactInfo, '@') == true){
                    $email[] = $row2;
                }
            }
        }
        $row['email'] = $email;

        //Find all guardian emails for an applicant
        $guardians = array();
        $sql3 ="SELECT   c.ContactInfo, c.IsPreferred
                    FROM tblAppGuardians g, tblAppContacts c
                    WHERE  g.fkApplicantID = $ApplicantID AND g.fkPersonID = c.fkPersonID";

        $result3 = $conn->runSelectQuery($sql3);
        if ($result3->num_rows > 0) {
            while ($row3 = $result3->fetch_assoc()) {
                        //Add email to list only if ContactInfo contains @
                        $ContactInfo = $row3['ContactInfo'];
                        if(strpos($ContactInfo, '@') == true){
                            $guardians[] =$row3;
                        }
                    }
                }
        $row['guardians'] = $guardians;
        $data[] = $row;
    }
}
$output = array();
echo json_encode($data);

?>
