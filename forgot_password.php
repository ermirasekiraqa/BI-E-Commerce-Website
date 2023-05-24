<?php
// Database connection details
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'testdatabase';

// Establish database connection
$conn = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Retrieve the form input
  $email = $_POST["email"];

  // Check if the email exists in the database
  // Add your database connection code here

  // Perform the query to fetch user data based on email
  $sql = "SELECT * FROM Users WHERE email = '$email'";
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) == 1) {
    // User exists, generate and send the password reset link
    $token = generateToken(); // Generate a unique token for the password reset link

    // Store the token and its associated email in a separate password_reset table
    // Add your database insert code here

    // Send the password reset link to the user's email
    $resetLink = "http://yourwebsite.com/reset_password.php?token=" . $token; // Update with your website URL and the reset_password.php file
    $subject = "Password Reset";
    $message = "Hello,\n\nPlease click the following link to reset your password: $resetLink";
    $headers = "From: Your Website <noreply@yourwebsite.com>"; // Update with your website details
    $mailSent = mail($email, $subject, $message, $headers);

    if ($mailSent) {
      echo "An email has been sent to $email with instructions to reset your password.";
    } else {
      echo "Failed to send the password reset email. Please try again later.";
    }
  } else {
    // User does not exist, display an error message
    echo "User with email $email does not exist. Please try again.";
  }
}

// Function to generate a unique token
function generateToken() {
  $token = bin2hex(random_bytes(32));
  return $token;
}
?>
