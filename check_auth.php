<?php
// Start the session
session_start();

// Check if the user is authenticated
$authenticated = false;
$email = '';
if (isset($_SESSION['email'])) {
  // User is authenticated
  $authenticated = true;
  $email = $_SESSION['email'];
}

// Create an associative array with the authentication status and email
$response = array(
  'authenticated' => $authenticated,
  'email' => $email
);

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
