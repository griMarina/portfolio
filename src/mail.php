<?php

require "vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;

// http://localhost:8888/

if ($_SERVER['HTTP_REFERER'] === 'http://127.0.0.1:8888/' && $_SERVER["REQUEST_METHOD"] === "POST") {

    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData);


    $name = htmlspecialchars($data->name);
    $email = htmlspecialchars($data->email);
    $message = htmlspecialchars($data->message);

    if (empty($name) || empty($email) || empty($message)) {
        header("Content-Type: application/json");
        echo json_encode(["message" => "Missing required information.", "status" => "ERROR"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Content-Type: application/json");
        echo json_encode(["message" => "Invalid email", "status" => "ERROR"]);
        exit;
    }

    $login = $_SERVER["EMAIL_USERNAME"];
    $password = $_SERVER["EMAIL_PASSWORD"];

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = "smtp.hostinger.com";
        $mail->SMTPAuth = true;
        $mail->Username =  $login;
        $mail->Password =  $password;
        $mail->SMTPSecure = "ssl";
        $mail->Port = 465;

        $mail->setFrom($login);
        $mail->addAddress($login);

        $mail->Subject = "New message from grimarina.com";
        $mail->Body = "Name: $name\n";
        $mail->Body .= "Email: $email\n";
        $mail->Body .= "Message: $message\n";

        $mail->send();

        $message = "Thank you, " . $name . "! Your message has been sent.";
        $status = "OK";
    } catch (\Exception $e) {
        $message =  "Opps! Message could not be sent. Error: " . $mail->ErrorInfo;
        $status = "ERROR";
    }

    header('Content-Type: application/json');
    echo json_encode(["message" => $message, "status" => $status]);
    exit;
} else {
    header('Content-Type: application/json');
    echo json_encode(["message" => "Access denied.", "status" => "ERROR"]);
    exit;
}
