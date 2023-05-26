<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testdatabase";

echo '<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin" />
      <link rel="stylesheet" href="css\normalize.css" />
      <link rel="stylesheet" href="css\common.css" />
      <link rel="stylesheet" href="css\shopping-cart-style.css" />
    
      <script defer src="js\header-functions.js"></script>
      <!-- <script defer src="js\shopping-cart.js"></script> -->
    
      <title>Cart</title>
    
      <link rel="icon" type="image/x-icon" href="images\favicon.png">
    </head>
    
    <body>
      <header>
        <nav id="header-menu">
          <img src="images\logo.png" alt="Black and light red sunglasses">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="explore.html"> Explore</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="about-us.html">About us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><i class="fa fa-shopping-cart" id="active"></i></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="shopping-cart-and-button">
        <div id="shopping-cart">
          <table class="cart-table" cellspacing="0" cellpadding="10">
          <thead>
          <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
          </tr>
          </thead>
          <tbody>';

// Retrieve cart items from the database or session storage
$cartItems = [];

// Check if the user is logged in or guest
if (isset($_SESSION['email'])) {
  $email = $_SESSION['email'];

  // Connect to the database
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check if the connection was successful
  if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
  }

  // Fetch the user_id based on the email
  $email = $_SESSION['email'];

  // Prepare the SQL statement to retrieve user_id
  $sql = "SELECT id FROM users WHERE email = ?";

  // Prepare and bind the parameter
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $email);

  // Execute the query
  $stmt->execute();

  // Bind the result variable
  $stmt->bind_result($user_id);

  // Fetch the result
  $stmt->fetch();

  // Close the statement
  $stmt->close();
  // Fetch all rows from the cart table for the specific user_id
  $sql = "SELECT * FROM cart WHERE user_id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $user_id);
  $stmt->execute();
  $result = $stmt->get_result();

  // Store the fetched rows in an array
  while ($row = $result->fetch_assoc()) {
    $cartItems[] = $row;
  }

  // Close the statement
  $stmt->close();
} else {
  // Retrieve cart items from the session storage
  // Access the session storage data and assign it to $cartItems
  if (isset($_SESSION['cart_items'])) {
    $cartItems = $_SESSION['cart_items'];
  } else {
    $cartItems = []; // Empty array for guest user
    echo 'Cart is empty';
  }
}

// Display the items from $cartItems
// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
  die('Database connection failed: ' . $conn->connect_error);
}

$counter = 1;
// Fetch product details for each cart item
foreach ($cartItems as &$item) {
  $productId = $item['product_id'];

  // Prepare the SQL statement to fetch product details
  $sql = "SELECT name, price, image_url FROM product WHERE product_id = ?";

  // Prepare and bind the parameter
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $productId);

  // Execute the query
  $stmt->execute();

  // Bind the result variables
  $stmt->bind_result($name, $price, $image_url);

  // Fetch the result
  $stmt->fetch();

  // Assign the fetched values to the cart item
  $item['name'] = $name;
  $item['price'] = $price;
  $item['image_url'] = $image_url;

  echo '<tr>';
  // Display the ID
  echo '<td>' . $counter . '</td>';
  $counter = $counter + 1;

  // Display the Image
  echo '<td><img src="images/' . $item['image_url'] . '" alt="Product Image"></td>';

  // Display the Name
  echo '<td>' . $item['name'] . '</td>';

  // Display the Price
  echo '<td>$' . $item['price'] . '</td>';

  // Display the Quantity
  echo '<td>' . $item['quantity'] . '</td>';

  // Display the trash icon
  echo '<td><i class="fa fa-trash"></i></td>';

  echo '</tr>';

  // Close the statement
  $stmt->close();
}

// Close the database connection
$conn->close();

// Calculate the total price of all items in the cart
$totalPrice = 0;
foreach ($cartItems as $item) {
  $totalPrice += ($item['price'] * $item['quantity']);
}

// Display the total price
echo '<tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>Total</td>
  <td>' . $totalPrice . '</td>
  </tr>
  </tbody>
</table>
</div>
  </main>
  <footer class="footer-with-gray-background">
    <section class="useful-info">
        <div class="get-in-touch">
            <h3>Head Office</h3>
            <div class="get-in-touch-info">
                <li>
                    <i class="fa fa-map-o"></i>
                    <p>See map for our location!</p>
                </li>
                <li>
                    <i class="fa fa-envelope-o"></i>
                    <p>eye-wear@gmail.com</p>
                </li>
                <li>
                    <i class="fa fa-phone"></i>
                    <p>+12 345 6789</p>
                </li>
                <li>
                    <i class="fa fa-clock-o"></i>
                    <p>Monday to Saturday, 9:00AM to 16.PM</p>
                </li>
            </div>
        </div>
        <div class="quick-links">
            <h3>Quick Links</h3>
            <li><a href="index.html">Home</a></li>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="shop.html">Shop Now</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="login.html">Log in</a></li>
            <li><a href="signup.html">Sign up</a></li>
        </div>
        <div class="logo-in-footer">
            <img src="images/logo.png" alt="Logo">
        </div>
    </section>
    <section class="copyright-social-media">
        <p>
            Copyright © 2023 Universiteti i Prishtines "Hasan Prishtina", FSHMN, Shkenca Kompjuterike
        </p>
        <div id="social-media-icons">
            <i class="fa fa-twitter"></i>
            <i class="fa fa-google-plus"></i>
            <i class="fa fa-linkedin"></i>
        </div>
    </section>
</footer>
</body>

</html>';