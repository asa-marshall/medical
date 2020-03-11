<?php
/**
 * Created by PhpStorm.
 * User: jacob
 * Date: 3/9/2020
 * Time: 12:49 PM
 */

require_once './dbcontroller.php';

//Create connection
$conn = new DBController();

$sql = "SELECT *
        FROM tlkpApplicationFiles
        ";

$data = $conn->runSelectQueryArray($sql);

echo json_encode($data);


?>