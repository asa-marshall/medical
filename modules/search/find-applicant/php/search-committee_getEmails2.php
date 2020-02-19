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

//print_r($_POST);

$sql = "SELECT a.ApplicantID, a.fkPersonID, p.PSalutation, p.PersonFN, p.PersonLN, p.PersonGenQual
        FROM tblApplicants a, tblAppPeople p 
        WHERE p.PersonID = a.fkPersonID";



//echo $sql;

$data = array();
$result = $conn->runSelectQuery($sql);
if ($result->num_rows > 0) {

    //Loop for each applicant
    while ($row = $result->fetch_assoc()) {

        $ApplicantID = $row['ApplicantID'];
        $fkPersonID = $row['fkPersonID'];

        if($row['PSalutation']==null)
        {
            $row['PSalutation']="";
        }
        if($row['PersonGenQual']==null)
        {
            $row['PersonGenQual']="";
        }

        $row['PSalutation']= trim($row['PSalutation']);
        $row['PersonGenQual']= trim($row['PersonGenQual']);


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
                    $email[] = $row2['ContactInfo'];
                }
            }
        }
        $row['email'] = $email;

        //Find all guardian emails for an applicant
        $guardians = array();
        $sql3 ="SELECT  g.GuardianSalutation, g.GuardianFN, g.GuardianLN, g.IsLegalGuard, g.GuardianID
                    FROM tblAppGuardians g
                    WHERE  g.fkApplicantID = $ApplicantID";


        $result3 = $conn->runSelectQuery($sql3);
        if ($result3->num_rows > 0) {
            while ($row3 = $result3->fetch_assoc()) {

                $GuardianID = $row3['GuardianID'];

                if($row3['GuardianSalutation']==null)
                {
                    $row3['GuardianSalutation']="";
                }

                $GuardianSalutaion = $row3['GuardianSalutation'];
                $GuardianFN = $row3['GuardianFN'];
                $GuardianLN = $row3['GuardianLN'];
                $IsLegalGuard = $row3['IsLegalGuard'];

                //Find all of the ContactInfo for each guardian
                $sql4 ="SELECT ContactInfo, IsPreferred
                    FROM tblAppGuardianContacts
                    WHERE fkGuardianID = '$GuardianID'";

                $guardianEmails = array();
                $result4 = $conn->runSelectQuery($sql4);
                if ($result4->num_rows > 0) {
                    while ($row4 = $result4->fetch_assoc()) {
                        //Add email to list only if ContactInfo contains @
                        $ContactInfo = $row4['ContactInfo'];
                        if(strpos($ContactInfo, '@') == true){
                            //$guardianEmails[] = $row4;
                            $guardians[] =$row4['ContactInfo'];
                        }
                    }
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
