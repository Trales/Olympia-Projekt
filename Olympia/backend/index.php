<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 1000");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding, Access-Control-Allow-Origin");
    header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");


    //cors();
   

    
    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    global $parameter;
    global $method;

    // Takes raw data from the request
    $json = file_get_contents('php://input');

    
     //var_dump($json);
    //  exit;

    $data = json_decode($json);

    // Wenn keine Methode definiert wurd exit
    if (!isset($data->method))
    {
        echo "{ result: 'method not specified'}";
        exit;
    }

    $method = $data->method;

    // Wenn keine Args definiert wurde exit
    if (!isset($data->args))
    {
        echo "{ result: 'args not specified'}";
        exit;
    }

    $parameter = $data->args;

    include "./backend.php";
?>