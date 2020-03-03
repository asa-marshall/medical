<?php

$directory= "datas";
if(isset($_POST['directory'])){
    $directory = filter_input(INPUT_POST, 'directory');
}
if(isset($_GET['directory'])){
    $directory =  basename(filter_input(INPUT_GET, "directory"));
}

$filename = 'gita000.jpg';
$filename = 'gita97.pdf';
if(isset($_POST['file'])){
    $filename =  basename(filter_input(INPUT_POST, "file"));
}

if(isset($_GET['file'])){
    $filename =  basename(filter_input(INPUT_GET, "file"));
}
// Specify file path.
$path = '../'. $directory . '/';


$download_file =  $path.$filename;
if(!empty($filename)){
    // Check file is exists on given path.
    if(file_exists($download_file))
    {
        header('content-disposition: attachment; filename=' . $filename);
        readfile($download_file);
        exit;
    }
    else{
        echo 'File does not exists on given path';
    }
}
?>
