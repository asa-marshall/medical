<?php

require_once './php/dbcontroller.php';

//Create connection
$connection = new DBController();

$status = "";
$errorMsg = "";
$permissions = [];

$login = "[no login passed]";
if (isset($_POST['login'])) {
    $login = filter_var($_POST["login"], FILTER_SANITIZE_STRING);
}

//Check if valid user
$test = $connection->runSelectQuery("select * from tblUser where Login='$login'");
if ($test->num_rows == 0) {
    $status = "error";
    $errorMsg = "$login not a valid login";
} else {

    //get privilege field names
    $sql = "select * from tblPrivilege";
    $result = $connection->runSelectQuery($sql);
    $fieldinfo = mysqli_fetch_fields($result);

    //build max select query
    foreach ($fieldinfo as $val) {
        $fieldName = $val->name;
        //dont store privilegeID and UserGroup
        if ($fieldName != 'privilegeID' && $fieldName != 'UserGroup') {
            $maxStrings[] = "max($fieldName) as $fieldName";
        }
    }
    $str = implode(",", $maxStrings);
    $sql = " select $str 
            from tblPrivilege 
            join tblUserPermissions ON tblPrivilege.privilegeID = tblUserPermissions.fkPrivilegeID 
            join tblUser ON tblUserPermissions.fkUserID = tblUser.UserID AND tblUser.Login='$login'";

    //echo $sql;

    //fetch permissions
    $maxResult = $connection->runSelectQuery($sql);
    $permissions = $maxResult->fetch_assoc();

    //examine row returned
    if ($maxResult->num_rows == 1) {
        $status = "ok";

        //check to see if user is a part of any user group
        // all fields will be null if the user is not a part of any group
        //for each field that is null set to 0
        foreach ($permissions as $key => $value) {
            if ($value == null)
                $permissions[$key] = 0;
        }
    } else {
        $status = "error";
        $numRows = $maxResult->num_rows;
        $errorMsg = "$numRows: There should only be one row returned. Error in query";
    }
}
$output = array();
$output["status"] = $status;
$output["error"] = $errorMsg;
$output["permissions"] = $permissions;
echo json_encode($output);


?>