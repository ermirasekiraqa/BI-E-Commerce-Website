// Attach event listener to trash icons
const trashIcons = document.querySelectorAll('.trash-icon');
trashIcons.forEach(icon => {
    icon.addEventListener('click', removeProductFromCart);
});

function removeProductFromCart(event) {
    const productId = event.target.dataset.productId;

    // Send AJAX request to remove the product from the cart
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'remove-product-from-cart.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Handle success response, e.g., update the cart UI
            console.log('Product removed from cart successfully');
        } else {
            // Handle error response
            console.log('Error removing product from cart');
        }
    };
    xhr.send(`product_id=${productId}`);
}
