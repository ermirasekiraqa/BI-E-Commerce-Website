<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the product ID from the request
  $productId = $_POST['product_id'];
    echo $productId;
  // Remove the product from the cart (implement the logic to remove from the cart)

  // Return a response indicating success or failure
//   if (/* product successfully removed from cart */) {
//     http_response_code(200); // OK
//   } else {
//     http_response_code(500); // Internal Server Error
//   }
}
?>
