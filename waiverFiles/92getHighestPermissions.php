<?php

require_once './php/dbcontroller.php';

//Create connection
$connection = new DBController();


//default to displaying for testing
$sql = "SELECT * FROM tblPrivilege WHERE UserGroup='Faculty' || UserGroup = 'Doctor'";


$login ="frank@email";
$login = "no login passed";
if (isset($_POST['login'])) {
    $login = filter_var($_POST["login"], FILTER_SANITIZE_STRING);
}
$sql =" select tblPrivilege.* 
            from tblPrivilege 
            join tblUserPermissions ON tblPrivilege.privilegeID = tblUserPermissions.fkPrivilegeID 
            join tblUser ON tblUserPermissions.fkUserID = tblUser.UserID AND tblUser.Login='$login'";

    
//echo $sql;
$permFields =[];
$permValues =[];
$maxStrings =[];
$status="";
$errorMsg="";
//get result from query

//get all fieldNames and store in array
//get all values and store in array
    if ($result = $connection->runSelectQuery($sql)) {

        $fieldinfo = mysqli_fetch_fields($result);
        foreach ($fieldinfo as $val) {
            $fieldName = $val->name;
            //dont store privilegeID and UserGroup
            if($fieldName != 'privilegeID'  && $fieldName !='UserGroup') {
                $permFields[] = $fieldName;
                $permValues[] = 0;
                $maxStrings[] ="max($fieldName) as $fieldName";
            }
        }
        $str = implode(",",$maxStrings);



        $sql = "SELECT $str FROM tblPrivilege AS p
                 INNER JOIN tblUserPermissions AS u
               ON p.privilegeID = u.fkPrivilegeID
               INNER JOIN tblUser AS p2
               ON u.fkUserID = p2.UserID
               WHERE u.Login = '$login'";

        $sql =" select $str 
            from tblPrivilege 
            join tblUserPermissions ON tblPrivilege.privilegeID = tblUserPermissions.fkPrivilegeID 
            join tblUser ON tblUserPermissions.fkUserID = tblUser.UserID AND tblUser.Login='$login'";
        echo "RESULT: $sql";
        $maxResult = $connection->runSelectQuery($sql);
        $maxRow = $maxResult->fetch_assoc();

        //store value of 1st row returned
        if ($result->num_rows > 0) {
            $status ="ok";

            while ($row = $result->fetch_assoc()) {
                $count = 0;
                foreach ($row as $key => $value) {
                    if($key != 'privilegeID'  && $key !='UserGroup') {
                        if ($value > $permValues[$count])
                            $permValues[$count] = $value;
                        $count++;
                    }
                }
            }

        }
        else
        {
            $test = $connection->runSelectQuery("select * from tblUser where Login='$login'");

                $status="ok";
                if ($test->num_rows == 0)
                {
                    $status="error";
                    $errorMsg="$login not a valid login";
                }

            //otherwise -- this user does not have any permissions -- eveything is 0
        }

    }
    else
    {
        $status="error";
        $errorMsg="$login is not a part of any User Group";

    }
/*
echo  ' {   "status": "ok", '.
      '     "error": "'. $errorMsg. '",'.
      '     "permFields":' . json_encode($permFields) .
      ',    "permValues":'. json_encode($permValues).
         "} ";
*/
    $output= array();
    $output["status"]=$status;
    $output["error"]=$errorMsg;
    $output["permFields"]= $permFields;
    $output["permValues"]=$permValues;
    $output["maxRow"]=$maxRow;
    echo json_encode($output);



?>