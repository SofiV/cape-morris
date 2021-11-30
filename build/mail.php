<?php
header('Content-Type: application/json');
if ($_POST['user-name'] && $_POST['email']) {
    $to = 'test@test.test';

    $subject = '[test.com] Say hi Form';
    $message = 'Name: ' . $_POST['user-name'] . "\r\n" .
        'Email: ' . $_POST['email'];
    $headers = 'From: no-reply@test.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $result = array(
        'post' => $_POST
    );

    if (!mail($to, $subject, $message, $headers)) {
        $result = error_get_last();
    }
    echo json_encode($result);
}

exit;