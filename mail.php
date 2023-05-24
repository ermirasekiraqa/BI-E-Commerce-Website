<?php
$name = $_POST['fname'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$conn = mysqli_connect("localhost","root", "", "testdatabase");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connection successful!";
}
$sql = "INSERT INTO database_table(First_name,Email,TheSubject,TheMessage) VALUES('{$name}','{$email}','{$subject}','{$message}')";
$result =  mysqli_query($conn,$sql) or die("Query Failed!");

?>