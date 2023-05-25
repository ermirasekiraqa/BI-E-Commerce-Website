<?php
// Database connection parameters
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'testdatabase';

// Create a new PDO instance
$pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);

// Function to add a product
function addProduct($name, $price, $description,$image_url, $brand, $category)
{
    global $pdo;
    $query = "INSERT INTO product (name, price,description,image_url, brand, category, created_at) VALUES (?, ?, ?, ?, ?, ?,NOW())";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$name, $description,$price, $image_url, $brand, $category]);
    echo "Product added successfully.";
}

// Function to delete a product
// Function to delete a product
function deleteProduct($product_id)
{
    global $pdo;
    
    // Check if the product with the given ID exists in the database
    $checkQuery = "SELECT COUNT(*) FROM product WHERE product_id = ?";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([$product_id]);
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        // Delete the product
        $deleteQuery = "DELETE FROM product WHERE product_id = ?";
        $deleteStmt = $pdo->prepare($deleteQuery);
        $deleteStmt->execute([$product_id]);
        echo "Product deleted successfully.";
    } else {
        echo "Product with ID $product_id does not exist.";
    }
}
/* function updateProduct($product_id, $name, $price, $description, $image_url, $brand, $category)
{
    global $pdo;
    
    // Check if the product with the given ID exists in the database
    $checkQuery = "SELECT COUNT(*) FROM product WHERE product_id = ?";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([$product_id]);
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        // Update the product
        $query = "UPDATE product SET name = ?, price = ?, image_url = ?,description=?, brand = ?, category = ? WHERE product_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$name, $price, $description,$image_url, $brand, $category, $product_id]);
        echo "Product updated successfully.";
    } else {
        echo "Product with ID $product_id does not exist.";
    }
} */
function updateProduct($product_id, $name, $price, $description, $image_url, $brand, $category)
{
    global $pdo;
    
    // Check if the product with the given ID exists in the database
    $checkQuery = "SELECT COUNT(*) FROM product WHERE product_id = ?";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([$product_id]);
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        // Build the update query
        $updateFields = [];
        $values = [];
        
        // Add the fields and values to update only if they are provided
        if (!empty($name)) {
            $updateFields[] = "name = ?";
            $values[] = $name;
        }
        if (!empty($price)) {
            $updateFields[] = "price = ?";
            $values[] = $price;
        }
        if (!empty($description)) {
            $updateFields[] = "description = ?";
            $values[] = $description;
        }
        if (!empty($image_url)) {
            $updateFields[] = "image_url = ?";
            $values[] = $image_url;
        }
        if (!empty($brand)) {
            $updateFields[] = "brand = ?";
            $values[] = $brand;
        }
        if (!empty($category)) {
            $updateFields[] = "category = ?";
            $values[] = $category;
        }

        if (!empty($updateFields)) {
            $updateFields[] = "created_at = NOW()"; // Update the creation timestamp

            // Update the product
            $query = "UPDATE product SET " . implode(", ", $updateFields) . " WHERE product_id = ?";
            $values[] = $product_id;
            $stmt = $pdo->prepare($query);
            $stmt->execute($values);
            echo "Product updated successfully.";
        } else {
            echo "No fields provided for update.";
        }
    } else {
        echo "Product with ID $product_id does not exist.";
    }
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check the action and perform the appropriate operation
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add':
                $name = $_POST['name'];
                $price = $_POST['price'];
                $description=$_POST['description'];
                $image_url = $_POST['image_url'];
                $brand = $_POST['brand'];
                $category = $_POST['category'];
                addProduct($name, $price, $description, $image_url, $brand, $category);
                break;
            case 'delete':
                $product_id = $_POST['product_id'];
                deleteProduct($product_id);
                break;
            case 'update':
                $product_id = $_POST['product_id'];
                $name = $_POST['name'];
                $price = $_POST['price'];
                $description=$_POST['description'];
                $image_url = $_POST['image_url'];
                $brand = $_POST['brand'];
                $category = $_POST['category'];
                updateProduct($product_id, $name, $price, $description,$image_url, $brand, $category);
                break;
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <link rel="stylesheet" href="css\add-delete-edit_product.css" />
    <link rel="stylesheet" type="text/css"
        href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin" />
    
</head>
<body>
<div class="container">
  <div class="form">
    <h1>Add Product</h1>
    <form action="" method="post">
        <input type="hidden" name="action" value="add">
        <input type="text" placeholder="Name" name="name" required><br><br>
        <input type="number" placeholder="Price" name="price" step="0.01" required><br><br>
        <input type="text" placeholder="Description"name="description" required><br><br>
        <div class="warning">Image file must be of format: <br> images//filename</div>
        <input type="text" placeholder="Image-URL" name="image_url" required><br><br>  
        <input type="text" placeholder="Brand"name="brand" required><br><br>    
        <input type="text" placeholder="Category" name="category" required><br><br>
        <!-- <input type="submit" value="Add Product"> -->
        <button class="form-button" type="submit" value="Add Product">Add Product</button>
    </form>
</div>
    <div class="form">
         <h1>Delete Product</h1>
        <form action="" method="post">
        <input type="hidden" name="action" value="delete" >
        <input type="number" placeholder="Product-ID" id="productID" name="product_id" required><br><br>
        <button class="form-button" type="submit" value="Delete Product">Delete Product</button>
        </form>
        <a href="product-table.php" target="_blank">
    <button class="form-button product-list-button-delete">Product List</button>
  </a>
    </div>
    <div class="form">
        <h1>Update Product</h1>
        <form action="" method="post">
        <input type="hidden" name="action" value="update">
        <input type="number"placeholder="Product-ID" name="product_id" required><br><br>
        <input type="text"  placeholder="Name"name="name" ><br><br>
        <input type="number" placeholder="Price" name="price" step="0.01"><br><br>
        <input type="text" placeholder="Description" name="description" step="0.01"><br><br>
        <input type="text" placeholder="Image-URL" name="image_url" ><br><br>
        <input type="text" placeholder="Brand" name="brand" ><br><br>
        <input type="text" placeholder ="Category"name="category" ><br><br>
        <button class="form-button" type="submit" value="Update Product">Update Product</button>
        </form>
        <a href="product-table.php" target="_blank">
    <button class="form-button product-list-button">Product List</button>
  </a>
    </div>
</body>
</html>