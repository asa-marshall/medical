<?php

$directory= "datas";
if(isset($_POST['directory'])){
    $directory = filter_input(INPUT_POST, 'directory');
}
if(isset($_GET['directory'])){
    $directory =  basename(filter_input(INPUT_GET, "directory"));
    //  echo "$_GET:  $_GET";
}

$filename = 'gita000.jpg';
$filename = 'gita97.pdf';
if(isset($_POST['file'])){
    $filename =  basename(filter_input(INPUT_POST, "file"));
    // echo "$_POST:  $_POST";
}

if(isset($_GET['file'])){
    $filename =  basename(filter_input(INPUT_GET, "file"));
    //  echo "$_GET:  $_GET";
}
// Specify file path.
//$path = '../datas/';
$path = '../'. $directory . '/';


$download_file =  $path.$filename;
if(!empty($filename)){
    // Check file is exists on given path.
    if(file_exists($download_file))
    { // echo "YAY File hass been found at: $download_file";
        header('content-disposition: attachment; filename=' . $filename);
        readfile($download_file);
        exit;
    }
    else{
        echo 'File does not exists on given path';
    }
}
?>
