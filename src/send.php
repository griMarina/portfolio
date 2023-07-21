<?php


use PHPMailer\PHPMailer\PHPMailer;

function sendMail($data)
{

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

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = "smtp.hostinger.com";
        $mail->SMTPAuth = true;
        $mail->Username =  EMAIL_USERNAME;
        $mail->Password =  EMAIL_PASSWORD;
        $mail->SMTPSecure = "ssl";
        $mail->Port = 465;

        $mail->setFrom(EMAIL_USERNAME);
        $mail->addAddress(EMAIL_USERNAME);

        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

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

    return [
        'message' => $message,
        'status' => $status
    ];
}
