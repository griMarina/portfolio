<?php

require $_SERVER["DOCUMENT_ROOT"] . "/../src/config.php";

if ($_SERVER['HTTP_REFERER'] === "http://localhost:8888/" && $_SERVER["REQUEST_METHOD"] === "POST") {

    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData);

    $response = sendMail($data);

    header('Content-Type: application/json');
    echo json_encode(["message" => $response["message"], "status" => $response["status"]]);
    exit;
} else {
    header('Content-Type: application/json');
    echo json_encode(["message" => "Access denied.", "status" => "ERROR"]);
    exit;
}
