<?php

// Create a database connection
$conn = mysqli_connect("localhost", "root", "", "testdatabase");

// Check if the connection was successful
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// Get the submitted email and password from the login form
$email = $_POST['email'];
$password = $_POST['password'];

// Query the admin table to check if the provided email and password match an admin record
$query = "SELECT * FROM admin WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $query);

// Check if a matching admin record was found
if (mysqli_num_rows($result) > 0) {
    // Admin login successful
    // Perform the actions you want for the logged-in admin

    // For example, you can set a session variable to indicate the admin is logged in
    session_start();
    $_SESSION['admin'] = true;

    // Redirect to the admin dashboard or any other page for the logged-in admin
    header("Location: admin_dashboard.php");
    exit();
} else {
    // Admin login failed
    // Redirect back to the login page with an error message
    header("Location: login.php?error=1");
    exit();
}

// Close the database connection
mysqli_close($conn);
?>