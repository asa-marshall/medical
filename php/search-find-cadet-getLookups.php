<?php

/*
 * utility_find_getLookups.php
 */

require_once './dbcontroller.php';


//Creates an array of people names for different types of user group
function extractNames($userList, $UserGroup)
{
    $data = array();
    $temp= array();
    $i = 0;
    while ($i < count($userList)) {
        $temp = new stdClass();
        $temp->$UserGroup = $userList[$i][$UserGroup];
        $temp->PersonName = $userList[$i]['PersonLN'] . ',' . $userList[$i]['PersonFN'];
        $data[] = $temp;
        $i++;
    }
    return $data;
}

//Create connection
$conn = new DBController();


$output = array();
$sql = "SELECT SiteID, SiteName
        FROM tlkpSite";
$data = $conn->runSelectQueryArray($sql);
$output['Site'] = $data;


//When the user logs in the SiteID will be stored as a session variable
$SESSION_SiteID = "1"; //defaulting SiteID to 1 for testing
 if(isset($_SESSION['SiteID'])) {
     $SESSION_SiteID = $_SESSION['SiteID'];
 }
 $output['SESSION_SiteID'] = $SESSION_SiteID;

 $sql= "SELECT ClassID, SiteClassNumber
        FROM  tblClasses
        WHERE fkSiteID ='$SESSION_SiteID'
        ORDER BY SiteClassNumber DESC";
$data = $conn->runSelectQueryArray($sql);
$output['Classes'] = $data;

$sql= "SELECT AutoID, CompanyID
        FROM  tlkpCadetCompany
        WHERE fkSiteID ='$SESSION_SiteID'
        ORDER BY CompanyID ASC";
$data = $conn->runSelectQueryArray($sql);
$output['CadetCompany'] = $data;

$sql= "SELECT AutoID, PlatoonID
        FROM  tlkpCadetPlatoon
        WHERE fkSiteID ='$SESSION_SiteID'
        ORDER BY PlatoonID ASC";
$data = $conn->runSelectQueryArray($sql);
$output['CadetPlatoon'] = $data;

$sql= "SELECT AutoID, SquadID
        FROM  tlkpCadetSquad
        WHERE fkSiteID ='$SESSION_SiteID'
        ORDER BY SquadID ASC";
$data = $conn->runSelectQueryArray($sql);
$output['CadetSquad'] = $data;

$sql = "SELECT AutoID, Status
        FROM tlkpCadetStatus";
$data = $conn->runSelectQueryArray($sql);
$output['CadetStatus'] = $data;

$sql = "SELECT  tblUsers.fkPersonID AS TeacherID,
                tblUsers.UserID,
                tblPeople.PersonFN, tblPeople.PersonLN, 
                tblUserPermissions.fkPrivilegeID, tblUserPermissions.fkUserID,
                tblPrivileges.UserGroup
        FROM tblPeople, tblUsers, tblUserPermissions, tblPrivileges
        WHERE tblPeople.PersonID = tblUsers.fkPersonID AND
              tblUsers.UserID = tblUserPermissions.fkUserID AND
              tblUserPermissions.fkPrivilegeID = tblPrivileges.PrivilegeID AND
              tblUsers.fkSiteID = '$SESSION_SiteID' AND
              tblPrivileges.UserGroup ='Faculty'";
$result = $conn->runSelectQueryArray($sql);
$data = extractNames($result, 'TeacherID');
$output['Teachers'] = $data;


$sql = "SELECT  tblUsers.fkPersonID AS CounselorID,
                tblUsers.UserID,
                tblPeople.PersonFN, tblPeople.PersonLN, 
                tblUserPermissions.fkPrivilegeID, tblUserPermissions.fkUserID,
                tblPrivileges.UserGroup
        FROM tblPeople, tblUsers, tblUserPermissions, tblPrivileges
        WHERE tblPeople.PersonID = tblUsers.fkPersonID AND
              tblUsers.UserID = tblUserPermissions.fkUserID AND
              tblUserPermissions.fkPrivilegeID = tblPrivileges.PrivilegeID AND
              tblUsers.fkSiteID = '$SESSION_SiteID' AND
              tblPrivileges.UserGroup ='Counselor'";
$result = $conn->runSelectQueryArray($sql);
$data = extractNames($result, 'CounselorID');
$output['Counselors'] = $data;


$sql = "SELECT  tblUsers.fkPersonID AS CaseManagerID,
                tblUsers.UserID,
                tblPeople.PersonFN, tblPeople.PersonLN, 
                tblUserPermissions.fkPrivilegeID, tblUserPermissions.fkUserID,
                tblPrivileges.UserGroup
        FROM tblPeople, tblUsers, tblUserPermissions, tblPrivileges
        WHERE tblPeople.PersonID = tblUsers.fkPersonID AND
              tblUsers.UserID = tblUserPermissions.fkUserID AND
              tblUserPermissions.fkPrivilegeID = tblPrivileges.PrivilegeID AND
              tblUsers.fkSiteID = '$SESSION_SiteID' AND
              tblPrivileges.UserGroup ='CaseManager'";
$result = $conn->runSelectQueryArray($sql);
$data = extractNames($result, 'CaseManagerID');
$output['CaseManagers'] = $data;

echo json_encode($output);
?>
